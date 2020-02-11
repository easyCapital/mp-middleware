import onFinished from 'on-finished';
import { format } from 'date-fns';

const Logger = use('Logger');

class RequestLogger {
  protected async handle({ request, response }, next) {
    const startTime = process.hrtime();

    onFinished(response.response, () => {
      const endTime = process.hrtime(startTime);
      const elapsedTime = Math.floor((endTime[0] * 1e9 + endTime[1]) / 1e6);

      Logger.transport('api').info('Middleware API request', {
        time: format(new Date(), 'dd-MM-yyyy hh:mm:ss'),
        app: 'Middleware',
        method: request.request.method,
        status: request.response.statusCode,
        duration: `${elapsedTime}ms`,
        url: request.request.url.substring(0, request.request.url.indexOf('?')),
      });
    });

    await next();
  }
}

export = RequestLogger;
