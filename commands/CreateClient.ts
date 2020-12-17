import { BaseCommand, args } from '@adonisjs/ace';
import { Client as ClientName, ClientType } from '@robinfinance/elwin-js';

import { Client } from 'App/Models';

export default class CreateClient extends BaseCommand {
  public static commandName = 'create:client';

  public static description = 'Create a new Client';

  public static settings = {
    loadApp: true,
  };

  @args.string({ description: 'Elwin source host' })
  public host: string;

  @args.string({ description: 'Client name' })
  public name: ClientName;

  @args.string({ description: 'Client type' })
  public type: ClientType;

  @args.string({ description: 'Backoffice API key' })
  public apiKey: string;

  @args.string({ description: 'User last name' })
  public isDemo: boolean;

  public async run() {
    try {
      await Client.create({
        host: this.host,
        name: this.name,
        type: this.type,
        apiKey: this.apiKey,
        isDemo: this.isDemo,
      });

      this.logger.info(`New client created`);
    } catch (exception) {
      this.logger.error(`An error occured: ${exception.detail}`);
    }
  }
}
