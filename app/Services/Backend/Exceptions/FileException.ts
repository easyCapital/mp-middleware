import { Exception as DefaultException } from '@poppinss/utils';
import { BackendError, BackendErrors } from '@robinfinance/elwin-js';

import { Exception, InvalidArgumentException } from 'App/Exceptions';

import BackendException from './BackendException';

export default class FileException extends DefaultException {
  constructor(error: BackendError) {
    Object.keys(error).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.InvalidFileTypeKeyError:
          throw new InvalidArgumentException(
            'Le document n’a pas pu être téléchargé, merci de réessayer.',
          );

        case BackendErrors.InvalidBase64FileContentError:
          throw new InvalidArgumentException(
            'Le fichier ne semble pas être valide, veuillez vérifier le fichier ou contacter le support Elwin.',
          );

        case BackendErrors.UnsupportedFileContentTypeError:
          throw new InvalidArgumentException(
            'Seul les documents JPG, JPEG, PNG et PDF peuvent être utilisés.',
          );

        case BackendErrors.FileTooBigError:
          throw new InvalidArgumentException(
            'Le document dépasse la taille maximale autorisée de 5Mo.',
          );

        case BackendErrors.NotFound:
          throw new InvalidArgumentException(
            'Le document n’a pas pu être trouvé, merci de vérifier l’identifiant fourni.',
          );

        default:
          throw new BackendException(error);
      }
    });

    // @ts-ignore
    super(Exception.defaultMessage, 400);
  }
}
