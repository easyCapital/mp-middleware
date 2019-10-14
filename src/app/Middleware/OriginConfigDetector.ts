import { ForbiddenException } from '../Exceptions';
import BackendApi from '../Api/Backend';
import { Context } from '../../types';

const Config = use('Config');
const Logger = use('Logger');

class OriginConfigDetector {
  protected async handle(ctx: Context, next) {
    const origin = ctx.request.header('Origin');
    if (!origin) {
      Logger.warning('Missing Origin header');
      throw new ForbiddenException();
    }
    const originConfig = Config.get('origins')[origin];
    if (!originConfig) {
      Logger.warning('%s could not be found in origins config', origin);
      throw new ForbiddenException();
    }
    ctx.app = originConfig.app;
    ctx.backendApi = new BackendApi(originConfig.backendApiKey);
    await next();
  }
}

export = OriginConfigDetector;
