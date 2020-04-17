import onFinished from 'on-finished';
import { format } from 'date-fns';

const Logger = use('Logger');

class RequestLogger {
  protected async handle(ctx: any, next) {
    const startTime = process.hrtime();

    onFinished(ctx.response.response, () => {
      const endTime = process.hrtime(startTime);
      const elapsedTime = Math.floor((endTime[0] * 1e9 + endTime[1]) / 1e6);

      Logger.transport('api').info('Middleware API request', {
        time: format(new Date(), 'dd-MM-yyyy hh:mm:ss'),
        app: 'Middleware',
        method: ctx.request.method(),
        status: ctx.request.response.statusCode,
        duration: `${elapsedTime}ms`,
        url: ctx.request.url(),
      });
    });

    await next();
  }
}

export = RequestLogger;
