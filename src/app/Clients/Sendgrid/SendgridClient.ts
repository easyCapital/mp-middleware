import Sendgrid from '@sendgrid/mail';
import { format } from 'date-fns';
import { getFileTypeFromBase64 } from '../../Helpers';
import { Exception } from '../../Exceptions';

export interface SendgridClientInterface {
  send(to: string, from: string, subject: string, content: string, attachments?: string[]): Promise<any>;
}

export default class SendgridClient implements SendgridClientInterface {
  private client: typeof Sendgrid;

  constructor(private readonly logger: any, private readonly token: string) {
    Sendgrid.setApiKey(this.token);

    this.client = Sendgrid;
  }

  public async send(to: string, from: string, subject: string, content: string, attachments?: string[]): Promise<void> {
    const startTime = process.hrtime();

    const message: any = {
      to,
      from,
      subject,
      html: content,
    };

    if (attachments) {
      message.attachments = attachments.map(attachment => {
        const [type, extension] = getFileTypeFromBase64(attachment);
        const creationDate = format(new Date(), 'dd-MM-yyyy_hh-mm-ss');

        return {
          content: attachment,
          filename: `upload_${creationDate}${extension}`,
          type,
          disposition: 'attachment',
        };
      });
    }

    try {
      await this.client.send(message);
    } catch (error) {
      if (error.message) {
        throw new Exception(`Sending email via Sendgrid failed with the following message: ${error.message}.`);
      }

      throw new Exception('Sending email via Sendgrid failed.');
    }

    const endTime = process.hrtime(startTime);
    const elapsedTime = Math.floor((endTime[0] * 1e9 + endTime[1]) / 1e6);

    this.log(elapsedTime);
  }

  private log(time: number) {
    this.logger.transport('api').info('Sendgrid API request', {
      time: format(new Date(), 'dd-MM-yyyy hh:mm:ss'),
      app: 'Sendgrid',
      method: 'POST',
      status: 200,
      duration: `${time}ms`,
    });
  }
}
