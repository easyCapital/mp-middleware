import TwigRenderer from '../app/Helpers/TwigRenderer';

const { ServiceProvider } = require('@adonisjs/fold');

class TwigProvider extends ServiceProvider {
  public register() {
    this.app.singleton('Twig', () => {
      const Helpers = use('Helpers');
      const Logger = this.app.use('Logger');
      return new TwigRenderer(Logger, Helpers);
    });
  }
}

export = TwigProvider;
