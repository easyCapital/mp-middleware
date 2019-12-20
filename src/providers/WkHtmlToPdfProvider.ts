import WkHtmlToPdf from '../app/Helpers/WkHtmlToPdf';

const { ServiceProvider } = require('@adonisjs/fold');

class WkHtmlToPdfProvider extends ServiceProvider {
  public register() {
    this.app.singleton('WkHtmlToPdf', () => {
      const Logger = this.app.use('Logger');
      return new WkHtmlToPdf(Logger);
    });
  }
}

export = WkHtmlToPdfProvider;
