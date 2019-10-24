const { ServiceProvider } = require('@adonisjs/fold');

import { BackendClient } from '../app/Clients/';

class BackendClientProvider extends ServiceProvider {
  public register() {
    const Config = this.app.use('Adonis/Src/Config');
    const Logger = this.app.use('Logger');
    const host = Config.get('clients.backend.host');
    this.app.singleton('BackendClientBuilder', () => {
      return (backendApiKey: string, customerToken?: string) => {
        return new BackendClient(Logger, host, backendApiKey, customerToken);
      };
    });
  }

  public boot() {}
}

export = BackendClientProvider;
