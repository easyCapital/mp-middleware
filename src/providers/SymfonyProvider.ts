const { ServiceProvider } = require('@adonisjs/fold');

import { SymfonyClient } from '../app/Clients/';

class SymfonyClientProvider extends ServiceProvider {
  public register() {
    const Logger = this.app.use('Logger');
    const Config = this.app.use('Adonis/Src/Config');
    const host = Config.get('clients.symfony.host');

    this.app.singleton('SymfonyClientBuilder', () => {
      return (customerToken?: string) => {
        return new SymfonyClient(Logger, host, customerToken);
      };
    });
  }

  public boot() {}
}

export = SymfonyClientProvider;
