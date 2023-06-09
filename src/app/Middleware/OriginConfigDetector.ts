import { ForbiddenException } from '../Exceptions';
import { Context } from '../../types';
import { URL } from 'url';

const Config = use('Config');
const Logger = use('Logger');

class OriginConfigDetector {
  protected async handle(ctx: Context, next: any): Promise<void> {
    const environment = Config.get('sentry.environment');
    const origin: string = findOrigin(ctx);
    const originConfig = Config.get('origins')[origin];

    if (!originConfig) {
      const errorMessage = `${origin} could not be found in origins config`;

      if (environment === 'staging' || environment === 'production') {
        const Sentry = use('Sentry');

        Sentry.captureException(new Error(errorMessage));
      }

      Logger.warning(errorMessage);

      throw new ForbiddenException();
    }

    ctx.app = originConfig.app;
    ctx.origin = origin;
    ctx.backendApiKey = originConfig.backendApiKey;

    ctx.response.header('Client', originConfig.client);

    if (originConfig.type) {
      ctx.response.header('Client-Type', originConfig.type);
    }

    if (originConfig.isDemo) {
      ctx.response.header('Is-Demo', originConfig.isDemo);
    }

    if (environment === 'staging' || environment === 'production') {
      const Sentry = use('Sentry');

      Sentry.setContext('origin', {
        origin,
        client: originConfig.client,
        clientType: originConfig.type,
      });
    }

    await next();
  }
}

export = OriginConfigDetector;

/**
 * Origin is only available in CORS or POST requests.
 * For other cases, we should always have the Referer
 */
function findOrigin(ctx: Context): string {
  const origin = ctx.request.header('Origin');

  if (origin) {
    return origin;
  }

  const referer = ctx.request.header('Referer');

  if (referer) {
    try {
      return new URL(referer).origin;
    } catch (e) {
      Logger.warning('Could not parse referer %s', origin);

      throw new ForbiddenException();
    }
  }

  if ('origin' in ctx.request.get()) {
    const { origin: queryOrigin } = ctx.request.get() as any;

    return queryOrigin;
  }

  Logger.warning('Origin could not be found in Origin or Referer header, or in the query params');

  throw new ForbiddenException();
}
