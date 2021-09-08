import { Context } from '../../types';

class UniverseDetector {
  protected async handle(ctx: Context, next: any): Promise<void> {
    const universe = ctx.request.header('MP-Universe');

    if (universe) {
      ctx.universe = universe;
    }

    await next();
  }
}

export = UniverseDetector;
