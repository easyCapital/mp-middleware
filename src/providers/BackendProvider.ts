const { ServiceProvider } = require('@adonisjs/fold');

import BackendClient, { BackendToken } from '../app/Clients/Backend/BackendClient';

class BackendClientProvider extends ServiceProvider {
  public register(): void {
    const Config = this.app.use('Adonis/Src/Config');
    const Logger = this.app.use('Logger');

    const host = Config.get('clients.backend.host');

    this.app.singleton('BackendClientBuilder', () => {
      return (backendApiKey: string, token?: BackendToken) => {
        return new BackendClient(Logger, host, backendApiKey, token);
      };
    });
  }
}

export = BackendClientProvider;
