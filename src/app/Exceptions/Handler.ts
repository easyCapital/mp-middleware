import Exception from './Exception';

const BaseExceptionHandler = use('BaseExceptionHandler');
const Logger = use('Logger');

class ExceptionHandler extends BaseExceptionHandler {
  public async handle(error, { response }) {
    if (error.name === 'FetchError' || error.name === 'Exception') {
      response.status(error.status).send(JSON.stringify({ error: Exception.defaultMessage }));
    } else {
      response.status(error.status).send(JSON.stringify({ error: error.message }));
    }
  }

  public async report(error) {
    if (error.name === 'FetchError' || error.name === 'Exception') {
      Logger.crit(error);
    }
  }
}

export = ExceptionHandler;
