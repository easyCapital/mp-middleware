const { ServiceProvider } = require('@adonisjs/fold');

import { SymfonyClient } from '../app/Clients/';

class SymfonyClientProvider extends ServiceProvider {
  public register() {
    const Config = this.app.use('Adonis/Src/Config');
    const Logger = this.app.use('Logger');

    this.app.singleton('SymfonyClient', () => {
      const host = Config.get('clients.symfony.host');

      const symfonyClient = new SymfonyClient(Logger, host);

      return symfonyClient;
    });
  }

  public boot() {}
}

export = SymfonyClientProvider;
