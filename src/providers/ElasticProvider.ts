const { ServiceProvider } = require('@adonisjs/fold');

import { ElasticClient } from '../app/Clients';

class ElasticClientProvider extends ServiceProvider {
  public register() {
    const Config = this.app.use('Adonis/Src/Config');

    this.app.singleton('ElasticClient', () => {
      const host = Config.get('clients.elastic.host');
      const elasticClient = new ElasticClient(host);

      return elasticClient;
    });
  }

  public boot() {}
}

export = ElasticClientProvider;
