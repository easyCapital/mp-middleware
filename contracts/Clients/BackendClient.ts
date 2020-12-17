import { Response } from 'node-fetch';
import { IncomingMessage, ServerResponse } from 'http';
import { Pagination, Filters, OrderBy } from '@robinfinance/elwin-js';

export interface BackendRequestOptions {
  url: string;
  pagination?: Pagination;
  filters?: Filters;
  orderBy?: OrderBy;
  latestBy?: string;
}

export interface BackendClientContract {
  setToken(token: string): void;
  get(options: BackendRequestOptions): Promise<Response>;
  patch(options: BackendRequestOptions, body?: any): Promise<Response>;
  post(options: BackendRequestOptions, body?: any): Promise<Response>;
  delete(options: BackendRequestOptions, body?: any): Promise<Response>;
  proxy(req: IncomingMessage, res: ServerResponse, options: BackendRequestOptions): Promise<void>;
}
