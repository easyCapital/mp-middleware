const { ServiceProvider } = require('@adonisjs/fold');

import { BackendClient } from '../app/Clients/';

class BackendClientProvider extends ServiceProvider {
  public register() {
    const Config = this.app.use('Adonis/Src/Config');
    const Logger = this.app.use('Logger');

    this.app.singleton('BackendClient', () => {
      const host = Config.get('clients.backend.host');
      const apiKey = Config.get('clients.backend.apiKey');
      const backendClient = new BackendClient(Logger, host, apiKey);

      return backendClient;
    });
  }

  public boot() {}
}

export = BackendClientProvider;
