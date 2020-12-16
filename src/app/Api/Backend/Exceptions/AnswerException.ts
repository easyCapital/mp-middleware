import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, ErrorType, Answer, BackendError, BackendErrors } from '@robinfinance/js-api';

const Config = use('Config');
const Logger = use('Logger');

export default class AnswerException extends HttpException {
  constructor(answers: Answer[], errors: BackendError[]) {
    const environment = Config.get('sentry.environment');
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
          case BackendErrors.InvalidError:
            errorMessageType = ErrorTypes.DEFAULT;
            break;

          case BackendErrors.InvalidPhoneFormatError:
          case BackendErrors.InvalidMobileFormatError:
          case BackendErrors.InvalidLandlineFormatError:
            errorMessageType = ErrorTypes.INVALID_MOBILE_NUMBER;
            break;

          default:
            const errorMessage = `Missing Error mapping value in AnswerException for ${errorKey}`;

            if (environment === 'staging' || environment === 'production') {
              const Sentry = use('Sentry');

              Sentry.captureMessage(errorMessage, {
                context: { errors },
              });
            }

            Logger.info(errorMessage);
            break;
        }

        errorMessages[answer.question] = errorMessageType;
      });
    });

    // @ts-ignore
    super(errorMessages, 400);
  }
}
