import Exception from './Exception';

const BaseExceptionHandler = use('BaseExceptionHandler');
const Config = use('Config');
const Logger = use('Logger');

class ExceptionHandler extends BaseExceptionHandler {
  public async handle(error, { response }) {
    if (error.name === 'FetchError' || error.name === 'Exception' || error.name === 'TypeError') {
      response.status(error.status).send(JSON.stringify({ error: Exception.defaultMessage }));
    } else {
      response.status(error.status).send(JSON.stringify({ error: error.message }));
    }
  }

  public async report(error) {
    const environment = Config.get('sentry.environment');

    if (
      [
        'FetchError',
        'Exception',
        'TypeError',
        'ExpectedJsonResponseException',
        'InvalidArgumentException',
        'MultipleTokenException',
        'NotFoundException',
      ].includes(error.name)
    ) {
      Logger.crit(error);

      if (environment === 'staging' || environment === 'production') {
        const Sentry = use('Sentry');

        Sentry.captureException(error);
      }
    }
  }
}

export = ExceptionHandler;
