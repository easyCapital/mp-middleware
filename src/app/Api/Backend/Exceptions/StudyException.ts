import { HttpException, InvalidArgumentException } from '@adonisjs/generic-exceptions';
import { BackendError, BackendErrors } from '@robinfinance/js-api';

import { Exception } from '../../../Exceptions';

const Config = use('Config');
const Logger = use('Logger');

export default class StudyException extends HttpException {
  constructor(error: BackendError) {
    const environment = Config.get('sentry.environment');

    let errorMessage: string | undefined;

    Object.keys(error).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.MaximumLengthError:
          throw new InvalidArgumentException('Vous avez dépassé la limite autorisée pour ce champ (100 charactères).');

        default:
          errorMessage = `Missing Error mapping value in StudyException for ${errorKey}`;

          if (environment === 'staging' || environment === 'production') {
            const Sentry = use('Sentry');

            Sentry.captureMessage(errorMessage, {
              contexts: {
                error: {
                  error: JSON.stringify(error),
                },
              },
            });
          }

          Logger.info(errorMessage);
          break;
      }
    });

    super(Exception.defaultMessage, 500);
  }
}
