import { HttpException } from '@adonisjs/generic-exceptions';
import { BackendError, BackendErrors } from '@robinfinance/js-api';

import { Exception, InvalidArgumentException } from '../../../Exceptions';

const Config = use('Config');
const Logger = use('Logger');

export default class FileException extends HttpException {
  constructor(error: BackendError, supportedFiles?: string) {
    const environment = Config.get('sentry.environment');

    let errorMessage: string | undefined;

    Object.keys(error).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.InvalidFileTypeKeyError:
        case BackendErrors.InvalidBase64FileContentError:
          throw new InvalidArgumentException('Le document n’a pas pu être téléchargé, merci de réessayer.');

        case BackendErrors.UnsupportedFileContentTypeError:
          if (supportedFiles) {
            throw new InvalidArgumentException(`Seul les documents ${supportedFiles} peuvent être utilisés.`);
          }

          throw new InvalidArgumentException(`Ce fichier est invalide, ou le format de fichier n'est pas autorisé.`);

        case BackendErrors.FileTooBigError:
          throw new InvalidArgumentException('Le document dépasse la taille maximale autorisée de 5Mo.');

        case BackendErrors.NotFound:
          throw new InvalidArgumentException('Le document n’a pas pu être trouvé, merci de vérifier l’id fourni.');

        default:
          errorMessage = `Missing Error mapping value in FileException for ${errorKey}`;

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
