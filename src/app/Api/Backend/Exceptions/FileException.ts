import { HttpException } from '@adonisjs/generic-exceptions';
import { BackendError, BackendErrors } from '@robinfinance/js-api';

import { Exception, InvalidArgumentException } from '../../../Exceptions';

const Config = use('Config');
const Logger = use('Logger');

export default class FileException extends HttpException {
  constructor(error: BackendError) {
    const environment = Config.get('sentry.environment');

    Object.keys(error).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.InvalidFileTypeKeyError:
        case BackendErrors.InvalidBase64FileContentError:
          throw new InvalidArgumentException('Le document n’a pas pu être téléchargé, merci de réessayer.');

        case BackendErrors.UnsupportedFileContentTypeError:
          throw new InvalidArgumentException('Seul les documents JPG, JPEG, PNG et PDF peuvent être utilisés.');

        case BackendErrors.FileTooBigError:
          throw new InvalidArgumentException('Le document dépasse la taille maximale autorisée de 5Mo.');

        case BackendErrors.NotFound:
          throw new InvalidArgumentException('Le document n’a pas pu être trouvé, merci de vérifier l’id fourni.');

        default:
          const errorMessage = `Missing Error mapping value in FileException for ${errorKey}`;

          if (environment === 'staging' || environment === 'production') {
            const Sentry = use('Sentry');

            Sentry.captureMessage(errorMessage, {
              context: { error },
            });
          }

          Logger.info(errorMessage);
          break;
      }
    });

    super(Exception.defaultMessage, 500);
  }
}
