import Exception from './Exception';

const BaseExceptionHandler = use('BaseExceptionHandler');
const Logger = use('Logger');

class ExceptionHandler extends BaseExceptionHandler {
  public async handle(error, { response }) {
    if (error.name === 'FetchError' || error.name === 'Exception') {
      response.status(error.status).send(Exception.defaultMessage);
    } else {
      response.status(error.status).send(error.message);
    }
  }

  public async report(error) {
    if (error.message) {
      if (error.name === 'FetchError' || error.name === 'Exception') {
        Logger.crit(error.message);
      }
    }
  }
}

export = ExceptionHandler;
