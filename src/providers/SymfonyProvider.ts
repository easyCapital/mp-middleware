const { ServiceProvider } = require('@adonisjs/fold');

import { SymfonyClient } from '../app/Clients/';

class SymfonyClientProvider extends ServiceProvider {
  public register() {
    const Config = this.app.use('Adonis/Src/Config');
    const Logger = this.app.use('Logger');

    this.app.singleton('SymfonyClient', () => {
      const host = Config.get('clients.symfony.host');
      const sessionKey = Config.get('clients.symfony.sessionKey');

      if (host && sessionKey) {
        const symfonyClient = new SymfonyClient(Logger, host, sessionKey);

        return symfonyClient;
      }

      Logger.crit('SymfonyClient could not be loaded because of missing parameters');

      return null;
    });
  }

  public boot() {}
}

export = SymfonyClientProvider;
