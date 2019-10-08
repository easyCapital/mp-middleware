const Config = use('Adonis/Src/Config');

class SymfonySessionDetector {
  private async handle({ request }, next) {
    const cookie = request.cookie(Config.get('clients.symfony.sessionKey'));

    if (cookie) {
      request.symfonySession = cookie;
    }

    await next();
  }
}

export = SymfonySessionDetector;
