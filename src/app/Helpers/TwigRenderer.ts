import util from 'util';
import twig from 'twig';
import { Logger } from '../../../typings/@adonisjs';

export default class TwigRenderer {
  private templatesPath: string;

  constructor(private readonly logger: Logger, helpers: any) {
    const cache = process.env.NODE_ENV !== 'development';

    this.templatesPath = `${helpers.resourcesPath()}/templates`;

    twig.cache(cache);
    twig.extendFilter('sortByAmount', sortByAmountFilter as any);
    twig.extendFilter('preg_replace', pregReplaceFilter);
    twig.extendFilter('url_decode', urlDecodeFilter);
  }

  /**
   * Calls Twig with the given template and model and returns the result as a string.
   *
   * Templates are expected to be in the 'src/resources/templates' directory of the project
   * and have a '.twig' extension.
   *
   * If the template is 'proposition/body.html', the template file used for rendering
   * will be 'src/resources/templates/proposition/body.html.twig'.
   */
  public async renderTemplate(template: string, model: object): Promise<string> {
    const templateFile = `${this.templatesPath}/${template}.twig`;

    this.logger.info(`Rendering twig template ${templateFile}`);

    return util.promisify(twig.renderFile)(templateFile, model as any);
  }
}

function sortByAmountFilter(values?: any[]) {
  if (!values) {
    return values;
  }

  return values.sort((a, b) => {
    return a.weight - b.weight;
  });
}

function pregReplaceFilter(subject: string, patternReplacement: [string, string]): string {
  return subject.replace(patternReplacement[0], patternReplacement[1]);
}

function urlDecodeFilter(url: string): string {
  return decodeURIComponent(url.replace(/\+/g, ' '));
}
