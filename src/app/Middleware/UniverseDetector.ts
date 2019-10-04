class UniverseDetector {
  private async handle({ request }, next) {
    const universe = request.header('Universe');

    if (universe) {
      request.universe = universe;
    }

    await next();
  }
}

export = UniverseDetector;
