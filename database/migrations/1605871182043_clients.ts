import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Clients extends BaseSchema {
  protected tableName = 'clients';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('name');
      table.string('host');
      table.string('api_key');
      table.string('type');
      table.boolean('is_demo');

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
