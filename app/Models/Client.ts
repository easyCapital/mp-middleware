import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { Client as ClientName, ClientType } from '@robinfinance/elwin-js';

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: ClientName;

  @column()
  public host: string;

  @column()
  public apiKey: string;

  @column()
  public type: ClientType;

  @column()
  public isDemo: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
