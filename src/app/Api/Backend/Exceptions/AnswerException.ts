import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, ErrorType, Answer, BackendError, BackendErrors } from '@robinfinance/js-api';

const Logger = use('Logger');

export default class AnswerException extends HttpException {
  constructor(answers: Answer[], errors: BackendError[]) {
    const errorMessages: { [key: string]: ErrorType } = {};

    errors.forEach((error, index) => {
      const answer = answers[index];

      Object.keys(error).forEach((errorKey) => {
        let errorMessageType: ErrorType = ErrorTypes.DEFAULT;

        switch (errorKey) {
          case BackendErrors.BlankError:
            errorMessageType = ErrorTypes.REQUIRED;
            break;

          case BackendErrors.MinValueError:
            errorMessageType = ErrorTypes.MIN;
            break;

          case BackendErrors.MaxValueError:
            errorMessageType = ErrorTypes.MAX;
            break;

          case BackendErrors.NotFound:
            errorMessageType = ErrorTypes.DEFAULT;
            break;

          case BackendErrors.InvalidMobileFormatError:
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
