import fetch from 'node-fetch';
import { format } from 'date-fns';

export interface SymfonyClientInterface {
  get(options: RequestOptions): Promise<any>;
  post(options: RequestOptions, body?: any): Promise<any>;
}

export interface RequestOptions {
  url: string;
  sessionCookie?: string;
}

export default class UserClient implements SymfonyClientInterface {
  private logger: any;
  private host: string;
  private sessionKey: string;

  constructor(logger: any, host: string, sessionKey: string) {
    this.logger = logger;
    this.host = `${host}/api/2.0`;
    this.sessionKey = sessionKey;
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
      },
      timeout: 10000,
    };

    if (options.sessionCookie !== undefined) {
      requestParameters.headers.Cookie = `${this.sessionKey}=${options.sessionCookie}`;
    }

    if (body !== undefined) {
      requestParameters.body = JSON.stringify(body);
    }

    const startTime = process.hrtime();

    const response = await fetch(url.href, requestParameters);

    const endTime = process.hrtime(startTime);
    const elapsedTime = Math.floor((endTime[0] * 1e9 + endTime[1]) / 1e6);

    this.logger.transport('api').info('Symfony API request', {
      time: format(new Date(), 'dd-MM-yyyy hh:mm:ss'),
      app: 'Symfony',
      method,
      status: response.status,
      duration: `${elapsedTime}ms`,
      url: response.url.replace(this.host, ''),
    });

    return response;
  }
}
