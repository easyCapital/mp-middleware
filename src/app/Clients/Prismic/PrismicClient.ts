import Prismic from 'prismic-javascript';
import { QueryOptions } from 'prismic-javascript/d.ts/ResolvedApi';
import { format } from 'date-fns';

export interface PrismicClientInterface {
  query(options: RequestOptions): Promise<any>;
}

export interface RequestOptions {
  query: string | string[];
  pagination?: {
    page: number;
    perPage: number;
  };
  filters?: {
    [key: string]: any;
  };
}

export default class PrismicClient implements PrismicClientInterface {
  private logger: any;
  private host: string;
  private apiKey: string;

  constructor(logger: any, host: string, apiKey: string) {
    this.logger = logger;
    this.host = host;
    this.apiKey = apiKey;
  }

  public async query(options: RequestOptions): Promise<any> {
    const api = await Prismic.getApi(this.host, {
      accessToken: this.apiKey,
    });

    const queryOptions: QueryOptions = {};

    if (options.pagination) {
      queryOptions.pageSize = options.pagination.perPage;
      queryOptions.page = options.pagination.page;
    }

    const startTime = process.hrtime();

    const response = await api.query(options.query, queryOptions);

    const endTime = process.hrtime(startTime);
    const elapsedTime = Math.floor((endTime[0] * 1e9 + endTime[1]) / 1e6);

    this.logger.transport('api').info('Prismic API request', {
      time: format(new Date(), 'dd-MM-yyyy hh:mm:ss'),
      app: 'Prismic',
      method: 'GET',
      status: 'response.status',
      duration: `${elapsedTime}ms`,
      query: options.query,
    });

    return response;
  }
}
