import { format } from 'date-fns';

export type BackendClientBuilder = (backendApiKey: string) => BackendClientInterface;

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
  private logger: any;
  private host: string;
  private apiKey: string;

  constructor(logger: any, host: string, apiKey: string) {
    this.logger = logger;
    this.host = `${host}/api`;
    this.apiKey = apiKey;
  }

  public async get(options: RequestOptions): Promise<any> {
    return this.call('GET', options);
  }

  public async post(options: RequestOptions, body?: any): Promise<any> {
    return this.call('POST', options, body);
  }

  private async call(method: string, options: RequestOptions, body?: any): Promise<any> {
    const url = new URL(`${this.host}/${options.url}`);

    const requestParameters: any = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${this.apiKey}`,
      },
      timeout: 10000,
    };

    if (options.pagination && requestParameters.headers) {
      const offset = (options.pagination.page - 1) * options.pagination.perPage;
      const limit = offset + options.pagination.perPage;

      requestParameters.headers.RANGE = `${offset}-${limit}`;
    }

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

    return response;
  }
}
