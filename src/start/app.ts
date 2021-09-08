const path = require('path');

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers: string[] = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/session/providers/SessionProvider',
  '@adonisjs/drive/providers/DriveProvider',
  'adonisjs-sse/providers/ServerSentEventsProvider',

  path.join(__dirname, '../providers/BackendProvider'),
  path.join(__dirname, '../providers/HubspotProvider'),
  path.join(__dirname, '../providers/PrismicProvider'),
  path.join(__dirname, '../providers/SentryProvider'),
  path.join(__dirname, '../providers/SlackProvider'),
  path.join(__dirname, '../providers/SymfonyProvider'),
];

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders: string[] = ['@adonisjs/vow/providers/VowProvider'];

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases: { [key: string]: string } = {};

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands: string[] = [];

export = { providers, aceProviders, aliases, commands };

String.prototype.interpolate = function (params) {
  return this.replace(/{([^{}]*)}/g, (a, b) => {
    const r = params[b];
    return r;
  });
};
