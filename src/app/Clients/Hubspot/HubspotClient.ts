import { format } from 'date-fns';
import { Filters } from '@robinfinance/js-api';

export interface HubspotClientInterface {
  get(options: RequestOptions): Promise<any>;
}

export interface RequestOptions {
  url: string;
  filters?: Filters;
}

export default class HubspotClient implements HubspotClientInterface {
  constructor(private readonly logger: any, private readonly host: string, private readonly token: string) {}

  public async get(options: RequestOptions): Promise<any> {
    return this.call('GET', options);
  }

  private async call(method: string, options: RequestOptions): Promise<any> {
    const url = new URL(`${this.host}/${options.url}`);

    if (this.token) {
      url.searchParams.append('hapikey', this.token);
    }

    if (options.filters) {
      Object.keys(options.filters).forEach((filter) => {
        if (options.filters) {
          url.searchParams.append(filter, options.filters[filter]);
        }
      });
    }

    const startTime = process.hrtime();

    const response = await fetch(url.href, { method });

    const endTime = process.hrtime(startTime);
    const elapsedTime = Math.floor((endTime[0] * 1e9 + endTime[1]) / 1e6);

    this.log(response.url, elapsedTime, method, response.status);

    if (!response.ok) {
      throw response;
    }

    return response;
  }

  private log(url: string, time: number, method: string, statusCode: number) {
    this.logger.transport('api').info('Hubspot API request', {
      time: format(new Date(), 'dd-MM-yyyy hh:mm:ss'),
      app: 'Hubspot',
      method,
      status: statusCode,
      duration: `${time}ms`,
      url: url.replace(this.host, '').replace(`hapikey=${this.token}`, 'hapikey=HIDDEN_TOKEN'),
    });
  }
}
