import { format } from 'date-fns';
import { IncomingMessage, ServerResponse } from 'http';
import httpProxy from 'http-proxy';
import { Pagination, Filters, OrderBy } from '@robinfinance/js-api';

import { ExpectedJsonResponseException, MultipleTokenException } from '../../Exceptions';

export type BackendClientBuilder = (backendApiKey: string, token?: BackendToken) => BackendClientInterface;

export interface BackendClientInterface {
  get(options: RequestOptions): Promise<any>;
  patch(options: RequestOptions, body?: any): Promise<any>;
  post(options: RequestOptions, body?: any): Promise<any>;
  proxy(req: IncomingMessage, res: ServerResponse, options: RequestOptions): Promise<any>;
}

export interface BackendToken {
  customerToken?: string;
  cgpToken?: string;
}

export interface RequestOptions {
  url: string;
  pagination?: Pagination;
  filters?: Filters;
  orderBy?: OrderBy;
  latestBy?: string;
}

export default class BackendClient implements BackendClientInterface {
  constructor(
    private readonly logger: any,
    private readonly host: string,
    private readonly apiKey: string,
    private readonly token?: BackendToken,
  ) {
    if (this.token && this.token.customerToken && this.token.cgpToken) {
      throw new MultipleTokenException();
    }
  }

  public async get(options: RequestOptions): Promise<any> {
    return this.call('GET', options);
  }

  public async patch(options: RequestOptions, body?: any): Promise<any> {
    return this.call('PATCH', options, body);
  }

  public async post(options: RequestOptions, body?: any): Promise<any> {
    return this.call('POST', options, body);
  }

  public async proxy(req: IncomingMessage, res: ServerResponse, options: RequestOptions): Promise<void> {
    const url = new URL(`${this.host}/api/${options.url}`);

    this.logger.info('Proxying %s to %s', req.url?.substring(0, req.url?.indexOf('?')), url.href);

    const proxy = httpProxy.createProxyServer();
    const responseEndPromise = this.buildProxyResponseEndPromise(proxy, req, url.href);

    proxy.web(req, res, this.proxyParams(url.href));

    return responseEndPromise;
  }

  private proxyParams(url: string): httpProxy.ServerOptions {
    const params: httpProxy.ServerOptions = {
      target: url,
      ignorePath: true,
      changeOrigin: true,
    };

    params.headers = { Authorization: `token ${this.apiKey}` };

    if (this.token && this.token.customerToken) {
      params.headers['Customer-Token'] = this.token.customerToken;
    } else if (this.token && this.token.cgpToken) {
      params.headers['CGP-Token'] = this.token.cgpToken;
    }

    return params;
  }

  private async call(method: string, options: RequestOptions, body?: any): Promise<any> {
    const url = new URL(`${this.host}/api/${options.url}`);

    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `token ${this.apiKey}`,
    });

    if (this.token && this.token.customerToken) {
      headers.set('Customer-Token', this.token.customerToken);
    } else if (this.token && this.token.cgpToken) {
      headers.set('CGP-Token', this.token.cgpToken);
    }

    if (options.pagination) {
      const perPage = Number(options.pagination.perPage) || 10;
      const page = Number(options.pagination.page) || 1;

      const offset = (page - 1) * perPage;
      const limit = offset + perPage;

      headers.set('RANGE', `${offset}-${limit}`);
    }

    if (options.orderBy) {
      if (options.orderBy.type === 'asc') {
        headers.set('ORDER', options.orderBy.key);
      } else {
        headers.set('ORDER', `-${options.orderBy.key}`);
      }
    }

    if (options.latestBy) {
      headers.set('Latest-By', options.latestBy);
    }

    const requestParameters: any = {
      method,
      headers,
      // timeout: 10000,
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
        const message = await response.text();

        throw new ExpectedJsonResponseException(message);
      }

      throw response;
    }

    return response;
  }

  /**
   * we need to wait for the proxying to finish, otherwise Adonis will return an empty 204 response
   */
  private buildProxyResponseEndPromise(proxy: httpProxy, req: IncomingMessage, symfonyUrl: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      proxy.on('error', error => {
        this.logger.error('Error while proxying %s to %s: %s', req.url, symfonyUrl, error);

        reject(error);
      });

      proxy.on('proxyRes', proxyRes => {
        proxyRes.on('end', () => {
          this.logger.debug('Done proxying %s to %s done', req.url, symfonyUrl);
          resolve();
        });
      });
    });
  }
}
