const { ServiceProvider } = require('@adonisjs/fold');

import { BackendClient } from '../app/Clients/';

class BackendClientProvider extends ServiceProvider {
  public register() {
    const Config = this.app.use('Adonis/Src/Config');

    this.app.singleton('BackendClient', () => {
      const host = Config.get('backend.host');
      const apiKey = Config.get('backend.apiKey');

      if (host && apiKey) {
        const backendClient = new BackendClient(host, apiKey);

        return backendClient;
      }

      return null;
    });
  }

  public boot() {}
}

export = BackendClientProvider;
