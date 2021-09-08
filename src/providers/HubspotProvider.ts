const { ServiceProvider } = require('@adonisjs/fold');

import HubspotClient from '../app/Clients/Hubspot/HubspotClient';

class HubspotClientProvider extends ServiceProvider {
  public register(): void {
    const Config = this.app.use('Adonis/Src/Config');
    const Logger = this.app.use('Logger');

    this.app.singleton('HubspotClient', () => {
      const host = Config.get('clients.hubspot.host');
      const apiKey = Config.get('clients.hubspot.apiKey');

      const hubspotClient = new HubspotClient(Logger, host, apiKey);

      return hubspotClient;
    });
  }
}

export = HubspotClientProvider;
