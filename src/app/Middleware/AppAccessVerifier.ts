import { ForbiddenException } from '../Exceptions';

const Config = use('Config');

class AppAccessVerifier {
  private async handle({ request }, next) {
    const app = request.header('MP-App');
    const origin = request.header('Origin');

    const allowedOriginsPerApp = Config.get('app.allowedOriginsPerApp');

    if (!app || !allowedOriginsPerApp[app] || !allowedOriginsPerApp[app].includes(origin)) {
      throw new ForbiddenException();
    }

    await next();
  }
}

export = AppAccessVerifier;
