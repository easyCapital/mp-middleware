import fetch from 'node-fetch';

export interface BackendClientInterface {
  get(options: RequestOptions): Promise<any>;
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
  private host: string;
  private apiKey: string;

  constructor(host: string, apiKey: string) {
    this.host = `${host}/api`;
    this.apiKey = apiKey;
  }

  public async get(options: RequestOptions): Promise<any> {
    return this.call('GET', options);
  }

  private call(method: string, options: RequestOptions, body?: any): Promise<any> {
    let url = `${this.host}/${options.url}`;

    const requestParameters: any = {
      method,
      headers: {
        Authorization: `token ${this.apiKey}`,
      },
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

    return fetch(url, requestParameters);
  }
}
