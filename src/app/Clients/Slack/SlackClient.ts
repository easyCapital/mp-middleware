import { WebClient, KnownBlock, Block, ErrorCode } from '@slack/web-api';
import { format } from 'date-fns';
import { Exception } from '../../Exceptions';

export interface SlackClientInterface {
  postMessage(channelId: string, data: (KnownBlock | Block)[]): Promise<any>;
}

export default class SlackClient implements SlackClientInterface {
  private client: WebClient;

  constructor(private readonly logger: any, private readonly token: string) {
    this.client = new WebClient(this.token);
  }

  public async postMessage(channelId: string, blocks: (KnownBlock | Block)[]): Promise<void> {
    const startTime = process.hrtime();

    try {
      await this.client.chat.postMessage({ channel: channelId, text: '', blocks });
    } catch (error) {
      if (error.code === ErrorCode.PlatformError) {
        throw new Exception(`Posting message to Slack failed with the following error: ${error.data.error}.`);
      } else {
        throw new Exception('Posting message to Slack failed.');
      }
    }

    const endTime = process.hrtime(startTime);
    const elapsedTime = Math.floor((endTime[0] * 1e9 + endTime[1]) / 1e6);

    this.log(elapsedTime);
  }

  private log(time: number) {
    this.logger.transport('api').info('Slack API request', {
      time: format(new Date(), 'dd-MM-yyyy hh:mm:ss'),
      app: 'Slack',
      method: 'POST',
      status: 200,
      duration: `${time}ms`,
    });
  }
}
