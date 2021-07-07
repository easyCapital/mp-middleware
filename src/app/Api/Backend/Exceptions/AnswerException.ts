import { HttpException } from '@adonisjs/generic-exceptions';
import { format } from 'date-fns';
import { ErrorTypes, ErrorType, Answer, BackendError, BackendErrors } from '@robinfinance/js-api';

const Config = use('Config');
const Logger = use('Logger');

export default class AnswerException extends HttpException {
  constructor(answers: Answer[], errors: BackendError[]) {
    const environment = Config.get('sentry.environment');
    const errorMessages: { key: string; row?: number; error: ErrorType }[] = [];

    if (Array.isArray(errors)) {
      errors.forEach((error, index) => {
        const answer = answers[index];

        Object.keys(error).forEach((errorKey) => {
          let errorMessageType: ErrorType = ErrorTypes.DEFAULT;

          switch (errorKey) {
            case BackendErrors.BlankError:
              errorMessageType = ErrorTypes.REQUIRED;
              break;

            case BackendErrors.MinValueError:
            case BackendErrors.MinimumLengthError:
              errorMessageType = ErrorTypes.MIN;
              break;

            case BackendErrors.MaxValueError:
            case BackendErrors.MaximumLengthError:
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
              errorMessageType = ErrorTypes.UNKNOWN;

              const errorMessage = `Missing Error mapping value in AnswerException for ${errorKey}`;

              if (environment === 'staging' || environment === 'production') {
                const Sentry = use('Sentry');

                Sentry.captureMessage(errorMessage, {
                  contexts: {
                    error: {
                      question: answer.question,
                      value: answer.value,
                      row: answer.row,
                      error: JSON.stringify(error),
                    },
                  },
                });
              }

              Logger.info(`${errorMessage} for question ${answer.question} and answer ${answer.value}`);
              break;
          }

          Logger.transport('info').info('Question error', {
            time: format(new Date(), 'dd-MM-yyyy hh:mm:ss'),
            question: answer.question,
            value: answer.value,
            row: answer.row,
            error,
          });

          if (environment === 'staging' || environment === 'production') {
            const Sentry = use('Sentry');

            Sentry.captureMessage('Question error', {
              contexts: {
                error: {
                  question: answer.question,
                  value: answer.value,
                  row: answer.row,
                  error: JSON.stringify(error),
                },
              },
            });
          }

          errorMessages.push({ key: answer.question, row: answer.row, error: errorMessageType });
        });
      });
    } else {
      const errorMessage = `Missing Error mapping value in AnswerException for : ${JSON.stringify(errors)}`;

      if (environment === 'staging' || environment === 'production') {
        const Sentry = use('Sentry');

        Sentry.captureMessage(errorMessage, {
          contexts: {
            error: {
              errors: JSON.stringify(errors),
            },
          },
        });
      }

      Logger.info(errorMessage);
    }

    // @ts-ignore
    super(errorMessages, 400);
  }
}
