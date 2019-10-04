const { ServiceProvider } = require('@adonisjs/fold');

import { PrismicClient } from '../app/Clients';

class PrismicClientProvider extends ServiceProvider {
  public register() {
    const Config = this.app.use('Adonis/Src/Config');
    const Logger = this.app.use('Logger');
    // const Redis = this.app.use('Redis');

    this.app.singleton('PrismicClient', () => {
      const host = Config.get('clients.prismic.host');
      const apiKey = Config.get('clients.prismic.apiKey');

      if (host && apiKey) {
        const prismicClient = new PrismicClient(Logger, host, apiKey);

        return prismicClient;
      }

      Logger.crit('PrismicClient could not be loaded because of missing parameters');

      return null;
    });
  }

  public boot() {}
}

export = PrismicClientProvider;
