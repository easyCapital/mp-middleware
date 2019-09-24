class UniverseDetector {
  private async handle({ request }, next) {
    const universe = request.header('Universe');

    request.universe = universe;

    await next();
  }
}

export = UniverseDetector;
