import fs from 'fs';
import util from 'util';
import uuidv4 from 'uuid/v4';
import { spawn, ChildProcess } from 'child_process';
import { tmpdir } from 'os';

import { Logger } from '../../../typings/@adonisjs';

export default class WkHtmlToPdf {
  constructor(private readonly logger: Logger) {}

  /**
   * Converts a HTML string into a PDF buffer using wkhtmltopdf binary.
   *
   * See https://wkhtmltopdf.org/usage/wkhtmltopdf.txt for a full list of options.
   *
   * Options are converted and forwarded to wkhtmltopdf.:
   * Boolean options are prefixed with '--enable-' or '--disable-' depending on the value,
   * all other options are prefixed with '--' and the value is passed as next argument.
   * ie: {"javascript": false, "page-offset": 3} options
   * will be passed as '--disable-javascript --page-offset 3' arguments.
   *
   * A custom 'footer' option which allow to specify a footer as an html string is available
   * (the footer will be written in a temporary file and passed to wkhtmltopdf
   * with the '--footer-html' argument).
   *
   * It should be possible to pipe output directly to a stream using `wkhtmltopdf - -`
   * but it produces access error on the output stream:
   *   QPainter::begin(): Returned false
   *   Error: Unable to write to destination
   * (see https://github.com/wkhtmltopdf/wkhtmltopdf/issues/3119).
   * So we use a temporary file for pdf generation.
   */
  public async convert(htmlContent: string, options?: object): Promise<Buffer> {
    const pdfFilePath = `${tmpdir()}/tmp-pdf-${uuidv4()}.pdf`;
    const htmlFooterPath = `${tmpdir()}/tmp-pdf-footer-${uuidv4()}.html`;
    const args: string[] = await this.buildArgs(pdfFilePath, htmlFooterPath, options);

    try {
      const wkhtmlChildProcess = spawn('wkhtmltopdf', args);
      const wkhtmlClosePromise = this.buildChildProcessPromise(wkhtmlChildProcess);

      wkhtmlChildProcess.stdin.end(htmlContent);

      await wkhtmlClosePromise; // wait for pdf file to be fully written

      return await util.promisify(fs.readFile)(pdfFilePath);
    } finally {
      fs.unlink(pdfFilePath, () => {});
      fs.unlink(htmlFooterPath, () => {});
    }
  }

  private async buildArgs(pdfFilePath: string, htmlFooterPath: string, options?: object) {
    const args: string[] = [];

    if (options) {
      for (const [key, value] of Object.entries(options)) {
        if (key === 'footer') {
          await util.promisify(fs.writeFile)(htmlFooterPath, value);
          args.push(`--footer-html`, htmlFooterPath);
        } else if (typeof value === 'boolean') {
          args.push(`--${value ? 'enable' : 'disable'}-${key}`);
        } else {
          args.push(`--${key}`, value);
        }
      }
    }

    args.push('-', pdfFilePath);

    return args;
  }

  private buildChildProcessPromise(childProcess: ChildProcess): Promise<void> {
    const start = new Date();

    return new Promise<void>((resolve, reject) => {
      let stderrOutput = '';

      if (childProcess.stderr) {
        childProcess.stderr.on('data', data => {
          stderrOutput += data;
        });
      }

      childProcess.on('close', code => {
        if (code === 0) {
          this.logger.info(`wkhtmltopdf executed successfully (took ${new Date().getTime() - start.getTime()}ms)`);

          resolve();
        } else {
          this.logger.error(`wkhtmltopdf returned an error ${code}: ${stderrOutput}`);

          reject(Error(stderrOutput));
        }
      });
    });
  }
}
