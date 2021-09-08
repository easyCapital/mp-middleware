import { HttpException } from '@adonisjs/generic-exceptions';
import { BackendError, BackendErrors } from '@robinfinance/js-api';

import { Exception } from '../../../Exceptions';

const Config = use('Config');
const Logger = use('Logger');

export default class SignatureException extends HttpException {
  constructor(error: BackendError) {
    const environment = Config.get('sentry.environment');

    let errorMessage: string | undefined;

    Object.keys(error).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.FileAlreadySignedError:
          throw new Exception('Le fichier a déjà été signé, veuillez contacter notre support.');

        case BackendErrors.SignNoFileToSignError:
          throw new Exception('Aucun fichier à signer, veuillez contacter notre support.');

        case BackendErrors.EmailValidationError:
          throw new Exception('Veuillez saisir une adresse e-mail valide.');

        default:
          errorMessage = `Missing Error mapping value in SignatureException for ${errorKey}`;

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
