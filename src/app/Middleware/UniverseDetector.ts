import { Context } from '../../types';

class UniverseDetector {
  protected async handle(ctx: Context, next) {
    const universe = ctx.request.header('Universe');
    if (universe) {
      ctx.universe = universe;
    }
    await next();
  }
}

export = UniverseDetector;
