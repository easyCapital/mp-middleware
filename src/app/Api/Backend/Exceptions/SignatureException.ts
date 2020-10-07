import { HttpException } from '@adonisjs/generic-exceptions';
import { BackendError, BackendErrors } from '@robinfinance/js-api';

import { Exception } from '../../../Exceptions';

const Logger = use('Logger');
const Sentry = use('Sentry');

export default class SignatureException extends HttpException {
  constructor(error: BackendError) {
    Object.keys(error).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.FileAlreadySignedError:
          throw new Exception('Le fichier a déjà été signé, veuillez contacter notre support.');

        case BackendErrors.SignNoFileToSignError:
          throw new Exception('Aucun fichier à signer, veuillez contacter notre support.');

        default:
          const errorMessage = `Missing Error mapping value in SignatureException for ${errorKey}`;

          Sentry.captureMessage(errorMessage, {
            context: { error },
          });
          Logger.info(errorMessage);
          break;
      }
    });

    super(Exception.defaultMessage, 500);
  }
}
