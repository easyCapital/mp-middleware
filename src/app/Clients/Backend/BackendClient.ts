import { format } from 'date-fns';

import { ExpectedJsonResponseException } from '../../Exceptions';

export type BackendClientBuilder = (backendApiKey: string, customerToken?: string) => BackendClientInterface;

export interface BackendClientInterface {
  get(options: RequestOptions): Promise<any>;
  post(options: RequestOptions, body?: any): Promise<any>;
}

export interface RequestOptions {
  url: string;
  pagination?: {
    page: number;
    perPage: number;
  };
  filters?: {
    [key: string]: any;
  };
}

export default class BackendClient implements BackendClientInterface {
  constructor(
    private readonly logger: any,
    private readonly host: string,
    private readonly apiKey: string,
    private readonly customerToken?: string,
  ) {}

  public async get(options: RequestOptions): Promise<any> {
    return this.call('GET', options);
  }

  public async post(options: RequestOptions, body?: any): Promise<any> {
    return this.call('POST', options, body);
  }

  private async call(method: string, options: RequestOptions, body?: any): Promise<any> {
    const url = new URL(`${this.host}/api/${options.url}`);

    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `token ${this.apiKey}`,
    });

    if (this.customerToken) {
      headers.set('Customer-Token', this.customerToken);
    }

    if (options.pagination) {
      const offset = (options.pagination.page - 1) * options.pagination.perPage;
      const limit = offset + options.pagination.perPage;

      headers.set('RANGE', `${offset}-${limit}`);
    }

    const requestParameters: any = {
      method,
      headers,
      timeout: 10000,
    };

    if (options.filters) {
      Object.keys(options.filters).forEach(filter => {
        if (options.filters) {
          if (Array.isArray(options.filters[filter])) {
            options.filters[filter].forEach(item => {
              url.searchParams.append(filter, item);
            });
          } else {
            url.searchParams.append(filter, options.filters[filter]);
          }
        }
      });
    }

    if (body !== undefined) {
      requestParameters.body = JSON.stringify(body);
    }

    const startTime = process.hrtime();

    const response = await fetch(url.href, requestParameters);

    const endTime = process.hrtime(startTime);
    const elapsedTime = Math.floor((endTime[0] * 1e9 + endTime[1]) / 1e6);

    this.logger.transport('api').info('Backoffice API request', {
      time: format(new Date(), 'dd-MM-yyyy hh:mm:ss'),
      app: 'Backoffice',
      method,
      status: response.status,
      duration: `${elapsedTime}ms`,
      url: response.url.replace(this.host, ''),
    });

    if (!response.ok) {
      if (response.headers.get('content-type') !== 'application/json') {
        throw new ExpectedJsonResponseException();
      }
      throw response;
    }

    return response;
  }
}
