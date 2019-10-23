import { format } from 'date-fns';
import { IncomingMessage, ServerResponse, IncomingHttpHeaders } from 'http';
import httpProxy from 'http-proxy';

export interface SymfonyClientInterface {
  get(options: RequestOptions): Promise<any>;
  post(options: RequestOptions, body?: any): Promise<any>;
  proxy(req: IncomingMessage, res: ServerResponse, synfonyPath: string): Promise<void>;
}

export interface RequestOptions {
  url: string;
}

export default class UserClient implements SymfonyClientInterface {
  private logger: any;
  private host: string;

  constructor(logger: any, host: string) {
    this.logger = logger;
    this.host = `${host}/api/2.0`;
  }

  public async get(options: RequestOptions): Promise<any> {
    return this.call('GET', options);
  }

  public async post(options: RequestOptions, body?: any): Promise<any> {
    return this.call('POST', options, body);
  }

  public async proxy(req: IncomingMessage, res: ServerResponse, synfonyPath: string): Promise<void> {
    const symfonyUrl = this.buildUrl(synfonyPath).href;
    this.logger.info('Proxying %s to %s', req.url, symfonyUrl);
    // "Unless listen(..) is invoked on the object, this does not create a webserver."
    // see https://github.com/http-party/node-http-proxy#core-concept
    const proxy = httpProxy.createProxyServer();
    const responseEndPromise = this.buildProxyResponseEndPromise(proxy, req, symfonyUrl);
    proxy.web(req, res, {
      target: symfonyUrl, // we provide the full synfony URL here
      ignorePath: true, // we don't want to use the original request path
      changeOrigin: true, // we don't want to use the original request host header
    });
    return responseEndPromise;
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
        removeSymfonyHeaders(proxyRes.headers);
        proxyRes.on('end', () => {
          this.logger.debug('Done proxying %s to %s done', req.url, symfonyUrl);
          resolve();
        });
      });
    });
  }

  private buildUrl(path: string) {
    return new URL(`${this.host}/${path}`);
  }

  private async call(method: string, options: RequestOptions, body?: any): Promise<any> {
    const url = this.buildUrl(options.url);

    const requestParameters: any = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    };

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

function removeSymfonyHeaders(headers: IncomingHttpHeaders) {
  delete headers['x-debug-token'];
  delete headers['x-debug-token-link'];
  delete headers['x-powered-by'];
}
