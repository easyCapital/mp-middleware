import onFinished from 'on-finished';
import { format } from 'date-fns';

const Config = use('Config');
const Logger = use('Logger');

class RequestLogger {
  protected async handle(ctx: any, next) {
    const environment = Config.get('sentry.environment');
    const startTime = process.hrtime();

    if (environment === 'staging' || environment === 'production') {
      const Sentry = use('Sentry');

      Sentry.setContext('request', {
        method: ctx.request.method(),
        url: ctx.request.url(),
      });
    }

    onFinished(ctx.response.response, () => {
      const endTime = process.hrtime(startTime);
      const elapsedTime = Math.floor((endTime[0] * 1e9 + endTime[1]) / 1e6);

      Logger.transport('api').info('Middleware API request', {
        time: format(new Date(), 'dd-MM-yyyy hh:mm:ss'),
        app: 'Middleware',
        method: ctx.request.method(),
        status: ctx.request.response.statusCode,
        duration: `${elapsedTime}ms`,
        origin: ctx.origin,
        url: ctx.request.url(),
      });

      if (environment === 'staging' || environment === 'production') {
        const Sentry = use('Sentry');

        Sentry.configureScope((scope) => scope.clear());
      }
    });

    await next();
  }
}

export = RequestLogger;
