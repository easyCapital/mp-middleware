import fetch from 'node-fetch';

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
    let url = `${this.host}/${options.url}`;

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
      const filters: string[] = [];

      Object.keys(options.filters).forEach(filter => {
        if (options.filters) {
          if (Array.isArray(options.filters[filter])) {
            options.filters[filter].forEach(item => {
              filters.push(`${filter}=${item}`);
            });
          } else {
            filters.push(`${filter}=${options.filters[filter]}`);
          }
        }
      });

      url += '?';

      filters.forEach(filter => {
        url += `&${filter}`;
      });
    }

    if (body !== undefined) {
      requestParameters.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestParameters);

    this.logger.transport('api').info(`Backoffice || ${method} || `);

    return response;
  }
}
