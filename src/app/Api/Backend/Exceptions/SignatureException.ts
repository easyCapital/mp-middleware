import { HttpException } from '@adonisjs/generic-exceptions';
import { BackendError, BackendErrors } from '@robinfinance/js-api';

import { Exception } from '../../../Exceptions';

const Logger = use('Logger');

export default class SignatureException extends HttpException {
  constructor(error: BackendError) {
    Object.keys(error).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.FileAlreadySignedError:
          throw new Exception('Le fichier a déjà été signé, veuillez contacter notre support.');

        case BackendErrors.SignNoFileToSignError:
          throw new Exception('Aucun fichier à signer, veuillez contacter notre support.');

        default:
          Logger.info('Missing Error mapping value in %s for %s', 'SignatureException', errorKey);
          break;
      }
    });

    super(Exception.defaultMessage, 500);
  }
}
