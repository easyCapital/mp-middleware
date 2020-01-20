import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, ErrorType } from '@robinfinance/js-api';

import { BackendError, BackendErrorTypes } from '../../../Clients/Backend/types';

const Logger = use('Logger');

export default class AnswerException extends HttpException {
  constructor(answers: { question: string; value: string | null }[], errors: BackendError[]) {
    const errorMessages = {};

    errors.forEach((error, index) => {
      const answer = answers[index];

      Object.keys(error).forEach(errorKey => {
        let errorMessageType: ErrorType = ErrorTypes.DEFAULT;

        switch (errorKey) {
          case BackendErrorTypes.BlankError:
            errorMessageType = ErrorTypes.REQUIRED;
            break;

          case BackendErrorTypes.MinValueError:
            errorMessageType = ErrorTypes.MIN;
            break;

          case BackendErrorTypes.MaxValueError:
            errorMessageType = ErrorTypes.MAX;
            break;

          case BackendErrorTypes.NotFound:
            errorMessageType = ErrorTypes.DEFAULT;
            break;

          case BackendErrorTypes.InvalidMobileFormatError:
            errorMessageType = ErrorTypes.INVALID_MOBILE_NUMBER;
            break;

          default:
            Logger.info('Missing Error mapping value in %s for %s', 'AnswerException', errorKey);
            break;
        }

        errorMessages[answer.question] = errorMessageType;
      });
    });

    // @ts-ignore
    super(errorMessages, 400);
  }
}
