import Config from '@ioc:Adonis/Core/Config';
import Logger from '@ioc:Adonis/Core/Logger';
import fetch, { Response, Headers, RequestInit } from 'node-fetch';
import { URL } from 'url';
import { IncomingMessage, ServerResponse } from 'http';
import httpProxy from 'http-proxy';
import { format } from 'date-fns';

import FileTooBigException from 'App/Exceptions/FileTooBigException';
import { BackendClientContract, BackendRequestOptions } from 'Contracts/Clients/BackendClient';
import ExpectedJsonResponseException from 'App/Exceptions/ExpectedJsonResponseException';

export default class BackendClient implements BackendClientContract {
  private host: string;

  constructor(private readonly apiKey: string, private token?: string) {
    this.host = Config.get('clients.backend.host');
  }

  public setToken(token: string) {
    this.token = token;
  }

  public async get(options: BackendRequestOptions): Promise<Response> {
    return this.call('GET', options);
  }

  public async patch(options: BackendRequestOptions, body?: any): Promise<Response> {
    return this.call('PATCH', options, body);
  }

  public async post(options: BackendRequestOptions, body?: any): Promise<Response> {
    return this.call('POST', options, body);
  }

  public async delete(options: BackendRequestOptions, body?: any): Promise<Response> {
    return this.call('DELETE', options, body);
  }

  public async proxy(
    req: IncomingMessage,
    res: ServerResponse,
    options: BackendRequestOptions,
  ): Promise<void> {
    const url = new URL(`${this.host}/api/${options.url}`);

    Logger.info(`Proxying ${req.url?.substring(0, req.url?.indexOf('?'))} to ${url.href}`);

    const proxy = httpProxy.createProxyServer();

    const headers = { Authorization: `token ${this.apiKey}` };

    if (this.token) {
      headers['CGP-Token'] = this.token;
    }

    const params: httpProxy.ServerOptions = {
      target: url,
      ignorePath: true,
      changeOrigin: true,
      headers,
    };

    proxy.web(req, res, params);

    return new Promise<void>((resolve, reject) => {
      proxy.on('error', (error) => {
        Logger.error(`Error while proxying ${req.url} to ${url.href}: ${error}`);

        reject(error);
      });

      proxy.on('proxyRes', (proxyRes) => {
        proxyRes.on('end', () => {
          resolve();
        });
      });
    });
  }

  private async call(
    method: string,
    options: BackendRequestOptions,
    body?: any,
  ): Promise<Response> {
    const url = new URL(`${this.host}/api/${options.url}`);

    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `token ${this.apiKey}`,
    });

    if (this.token) {
      headers.set('CGP-Token', this.token);
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

    if (options.filters) {
      Object.keys(options.filters).forEach((filter) => {
        if (options.filters) {
          if (Array.isArray(options.filters[filter])) {
            options.filters[filter].forEach((item) => {
              url.searchParams.append(filter, item);
            });
          } else {
            url.searchParams.append(filter, options.filters[filter]);
          }
        }
      });
    }

    const requestParameters: RequestInit = {
      method,
      headers,
    };

    if (body !== undefined) {
      requestParameters.body = JSON.stringify(body);
    }

    const startTime = process.hrtime();

    const response = await fetch(url.href, requestParameters);

    const endTime = process.hrtime(startTime);
    const elapsedTime = Math.floor((endTime[0] * 1e9 + endTime[1]) / 1e6);

    this.log(response.url, elapsedTime, method, response.status);

    if (!response.ok) {
      if (response.status === 413) {
        throw new FileTooBigException();
      }

      if (response.headers.get('content-type') !== 'application/json') {
        const message = await response.text();

        throw new ExpectedJsonResponseException(message);
      }

      throw response;
    }

    return response;
  }

  private log(url: string, time: number, method: string, statusCode: number) {
    Logger.info(
      `Backoffice API request || ${format(
        new Date(),
        'dd-MM-yyyy hh:mm:ss',
      )} || ${method} || ${statusCode} || ${time}ms || ${url.replace(this.host, '')}`,
    );
  }
}
