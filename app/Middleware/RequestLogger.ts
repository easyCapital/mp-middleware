import Logger from '@ioc:Adonis/Core/Logger';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import onFinished from 'on-finished';
import { format } from 'date-fns';

export default class RequestLogger {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const startTime = process.hrtime();

    onFinished(response.response, () => {
      const endTime = process.hrtime(startTime);
      const elapsedTime = Math.floor((endTime[0] * 1e9 + endTime[1]) / 1e6);

      const origin = request.header('Origin');

      Logger.info(
        `Middleware API request || ${format(
          new Date(),
          'dd-MM-yyyy hh:mm:ss',
        )} || ${request.method()} || ${
          request.response.statusCode
        } || ${elapsedTime}ms || ${origin?.replace('http://', '')} || ${request.url()}`,
      );
    });

    await next();
  }
}
