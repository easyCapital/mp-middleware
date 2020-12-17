import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { RequestContract } from '@ioc:Adonis/Core/Request';
import Logger from '@ioc:Adonis/Core/Logger';
import { URL } from 'url';

import { Client } from 'App/Models';
import ForbiddenException from 'App/Exceptions/ForbiddenException';
import { BackendService } from 'App/Services';

export default class BackendIdentifier {
  public async handle(context: HttpContextContract, next: () => Promise<void>) {
    const origin = this.getOrigin(context.request);

    try {
      const client = await Client.findBy('host', origin);

      if (!client) {
        const errorMessage = `${origin} could not be found in origins config`;

        Logger.warn(errorMessage);

        throw new ForbiddenException();
      }

      context.backendService = new BackendService(client.apiKey);
      context.client = client;
    } catch {
      const errorMessage = `${origin} could not be found in origins config`;

      Logger.warn(errorMessage);

      throw new ForbiddenException();
    }

    await next();
  }

  private getOrigin(request: RequestContract): string {
    const originHeader = request.header('Origin');

    if (originHeader) {
      return originHeader;
    }

    const refererHeader = request.header('Referer');

    if (refererHeader) {
      try {
        return new URL(refererHeader).origin;
      } catch {
        Logger.warn(`Could not parse referer Header: ${refererHeader}`);

        throw new ForbiddenException();
      }
    }

    const query = request.get();

    if ('origin' in query) {
      return query.origin;
    }

    Logger.warn('Origin could not be found in Origin Header, Referer Header or Origin Query');

    throw new ForbiddenException();
  }
}
