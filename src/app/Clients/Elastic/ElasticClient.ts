import { Client } from '@elastic/elasticsearch';
import proxy from 'proxy-agent';

import { ElasticIndex, ElasticIndexInterface } from './ElasticIndex';

export interface ElasticClientInterface {
  index(index: ElasticIndex): Promise<any>;
}

export default class ElasticClient implements ElasticClientInterface {
  private host: string;
  private client: Client;

  constructor(host: string) {
    this.host = host;

    // todo : use proxy in dev only
    this.client = new Client({ node: this.host, agent: () => proxy('socks5h://localhost:8001') });
  }

  public async index(index: ElasticIndexInterface): Promise<any> {
    const response = this.client.index(index.toJSON());

    return response;
  }
}
