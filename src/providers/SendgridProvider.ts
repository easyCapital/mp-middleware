const { ServiceProvider } = require('@adonisjs/fold');

import SendgridClient from '../app/Clients/Sendgrid/SendgridClient';

class SendgridClientProvider extends ServiceProvider {
  public register() {
    const Config = this.app.use('Adonis/Src/Config');
    const Logger = this.app.use('Logger');

    this.app.singleton('SendgridClient', () => {
      const token = Config.get('clients.sendgrid.apiKey');
      const sendgridClient = new SendgridClient(Logger, token);

      return sendgridClient;
    });
  }

  public boot() {}
}

export = SendgridClientProvider;
