import { WebClient, KnownBlock, Block, ErrorCode } from '@slack/web-api';
import { format } from 'date-fns';

export interface SlackClientInterface {
  postMessage(channelId: string, text: string, data: (KnownBlock | Block)[]): Promise<any>;
}

export default class SlackClient implements SlackClientInterface {
  private client: WebClient;

  constructor(private readonly logger: any, private readonly token: string) {
    this.client = new WebClient(this.token);
  }

  public async postMessage(channelId: string, text: string, blocks: (KnownBlock | Block)[]): Promise<void> {
    const startTime = process.hrtime();

    let statusCode: number | undefined;

    try {
      await this.client.chat.postMessage({ channel: channelId, text, blocks });

      statusCode = 200;
    } catch (error: any) {
      if (error.code === ErrorCode.PlatformError) {
        this.logger.crit(`Posting message to Slack failed with the following error: ${error.data.error}.`);
      } else {
        this.logger.crit('Posting message to Slack failed.');
      }
    }

    const endTime = process.hrtime(startTime);
    const elapsedTime = Math.floor((endTime[0] * 1e9 + endTime[1]) / 1e6);

    this.log(elapsedTime, statusCode);
  }

  private log(time: number, statusCode?: number) {
    this.logger.transport('api').info('Slack API request', {
      time: format(new Date(), 'dd-MM-yyyy hh:mm:ss'),
      app: 'Slack',
      method: 'POST',
      status: statusCode || '-',
      duration: `${time}ms`,
    });
  }
}
