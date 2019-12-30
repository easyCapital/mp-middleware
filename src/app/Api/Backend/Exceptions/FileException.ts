import { HttpException } from '@adonisjs/generic-exceptions';

import { BackendError, BackendErrorTypes } from '../../../Clients/Backend/types';
import { Exception, InvalidArgumentException } from '../../../Exceptions';

const Logger = use('Logger');

export default class FileException extends HttpException {
  constructor(error: BackendError) {
    Object.keys(error).forEach(errorKey => {
      switch (errorKey) {
        case BackendErrorTypes.InvalidFileTypeKeyError:
        case BackendErrorTypes.InvalidBase64FileContentError:
          throw new InvalidArgumentException('Le document n’a pas pu être téléchargé, merci de réessayer.');

        case BackendErrorTypes.UnsupportedFileContentTypeError:
          throw new InvalidArgumentException('Seul les documents JPG, JPEG, PNG et PDF peuvent être utilisés.');

        case BackendErrorTypes.FileTooBigError:
          throw new InvalidArgumentException('Le document dépasse la taille maximale autorisée de 5Mo.');

        default:
          Logger.info('Missing Error mapping value in %s for %s', 'FileException', errorKey);
          break;
      }
    });

    super(Exception.defaultMessage, 500);
  }
}
