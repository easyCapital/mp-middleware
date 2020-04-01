const { ServiceProvider } = require('@adonisjs/fold');

import SlackClient from '../app/Clients/Slack/SlackClient';

class SlackClientProvider extends ServiceProvider {
  public register() {
    const Config = this.app.use('Adonis/Src/Config');
    const Logger = this.app.use('Logger');

    this.app.singleton('SlackClient', () => {
      const token = Config.get('clients.slack.apiKey');
      const slackClient = new SlackClient(Logger, token);

      return slackClient;
    });
  }

  public boot() {}
}

export = SlackClientProvider;
