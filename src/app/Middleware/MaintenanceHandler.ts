const Env = use('Env');

class MaintenanceHandler {
  protected async handle(ctx: any, next) {
    const underMaintenance = Env.get('UNDER_MAINTENANCE');

    if (underMaintenance === 'true') {
      ctx.response.header('Is-Under-Maintenance', true);
    }

    await next();
  }
}

export = MaintenanceHandler;
