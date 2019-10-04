const Env = use('Env');

class SymfonySessionDetector {
  private async handle({ request }, next) {
    const cookie = request.cookie(Env.get('clients.mpMiddleware.sessionKey'));

    if (cookie) {
      request.symfonySession = cookie;
    }

    await next();
  }
}

export = SymfonySessionDetector;
