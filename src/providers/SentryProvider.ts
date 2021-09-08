const { ServiceProvider } = require('@adonisjs/fold');
const Sentry = require('@sentry/node');

require('@sentry/tracing');

class SentryProvider extends ServiceProvider {
  public register(): void {
    const Config = this.app.use('Adonis/Src/Config');
    const environment = Config.get('sentry.environment');

    if (environment === 'staging' || environment === 'production') {
      this.app.singleton('Sentry', () => {
        Sentry.init({
          dsn: Config.get('sentry.dsn'),
          environment: Config.get('sentry.environment'),
          release: Config.get('sentry.release'),
          debug: Config.get('sentry.debug'),
          tracesSampleRate: 0.1,
          integrations: [new Sentry.Integrations.Http({ tracing: true })],
        });

        return Sentry;
      });
    }
  }
}

export = SentryProvider;
