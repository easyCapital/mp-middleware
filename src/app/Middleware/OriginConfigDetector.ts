import { ForbiddenException } from '../Exceptions';
import { Context } from '../../types';
import { URL } from 'url';

const Config = use('Config');
const Logger = use('Logger');

class OriginConfigDetector {
  protected async handle(ctx: Context, next) {
    const origin: string = findOrigin(ctx);
    const originConfig = Config.get('origins')[origin];

    if (!originConfig) {
      Logger.warning('%s could not be found in origins config', origin);
      throw new ForbiddenException();
    }

    ctx.app = originConfig.app;
    ctx.origin = origin;
    ctx.backendApiKey = originConfig.backendApiKey;

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

  Logger.warning('Missing both Origin and Referer headers');

  throw new ForbiddenException();
}
