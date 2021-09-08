const { ServiceProvider } = require('@adonisjs/fold');

import { PrismicClient } from '../app/Clients';

class PrismicClientProvider extends ServiceProvider {
  public register(): void {
    const Config = this.app.use('Adonis/Src/Config');
    const Logger = this.app.use('Logger');

    this.app.singleton('PrismicClient', () => {
      const host = Config.get('clients.prismic.host');
      const apiKey = Config.get('clients.prismic.apiKey');
      const prismicClient = new PrismicClient(Logger, host, apiKey);

      return prismicClient;
    });
  }
}

export = PrismicClientProvider;
