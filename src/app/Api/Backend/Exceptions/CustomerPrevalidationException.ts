import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, ErrorType, BackendError, BackendErrors, CustomerDTO } from '@robinfinance/js-api';

const Config = use('Config');
const Logger = use('Logger');

export default class CustomerPrevalidationException extends HttpException {
  constructor(errors: { email: BackendError; answers: BackendError[] }[], initialData: CustomerDTO[]) {
    const environment = Config.get('sentry.environment');
    const errorMessages: { [key: string]: ErrorType[] }[] = [];

    errors.forEach((customerErrors, customerIndex) => {
      const customerErrorMessages: { [key: string]: ErrorType[] } = {};

      if (customerErrors.email) {
        const customerEmailErrorMessages: ErrorType[] = [];

        Object.keys(customerErrors.email).forEach((errorKey) => {
          switch (errorKey) {
            case BackendErrors.EmailValidationError:
              customerEmailErrorMessages.push(ErrorTypes.INVALID_EMAIL);
              break;

            case BackendErrors.EmailUniqueConstraintError:
              customerEmailErrorMessages.push(ErrorTypes.USER_EXISTS);
              break;

            case BackendErrors.MissingMandatoryFieldsError:
              customerEmailErrorMessages.push(ErrorTypes.REQUIRED);
              break;

            default:
              customerEmailErrorMessages.push(ErrorTypes.UNKNOWN);

              const errorMessage = `Missing Error mapping value in CustomerPrevalidationException for ${errorKey}`;

              if (environment === 'staging' || environment === 'production') {
                const Sentry = use('Sentry');

                Sentry.captureMessage(errorMessage, {
                  contexts: {
                    error: customerErrors.email[errorKey],
                    question: 'email',
                    value: initialData[customerIndex].email,
                  },
                });
              }

              Logger.info(errorMessage);
              break;
          }
        });

        customerErrorMessages.email = customerEmailErrorMessages;
      }

      if (customerErrors.answers) {
        customerErrors.answers.forEach((answerErrors, answerIndex) => {
          if (Object.keys(answerErrors).length > 0) {
            const customerAnswerErrorMessages: ErrorType[] = [];
            const initialAnswer = initialData[customerIndex].answers[answerIndex];

            Object.keys(answerErrors).forEach((errorKey) => {
              switch (errorKey) {
                case BackendErrors.BlankError:
                case BackendErrors.NullError:
                  customerAnswerErrorMessages.push(ErrorTypes.REQUIRED);
                  break;

                case BackendErrors.InvalidChoiceError:
                  break;

                case BackendErrors.InvalidError:
                  customerAnswerErrorMessages.push(ErrorTypes.INVALID);
                  break;

                case BackendErrors.MinValueError:
                case BackendErrors.MinimumLengthError:
                  customerAnswerErrorMessages.push(ErrorTypes.MIN);
                  break;

                case BackendErrors.MaxValueError:
                case BackendErrors.MaximumLengthError:
                  customerAnswerErrorMessages.push(ErrorTypes.MAX);
                  break;

                case BackendErrors.NotFound:
                  customerAnswerErrorMessages.push(ErrorTypes.UNKNOWN);
                  break;

                case BackendErrors.InvalidPhoneFormatError:
                case BackendErrors.InvalidLandlineFormatError:
                  customerAnswerErrorMessages.push(ErrorTypes.INVALID_PHONE_NUMBER);
                  break;

                case BackendErrors.InvalidMobileFormatError:
                  customerAnswerErrorMessages.push(ErrorTypes.INVALID_MOBILE_NUMBER);
                  break;

                default:
                  customerAnswerErrorMessages.push(ErrorTypes.UNKNOWN);

                  const errorMessage = `Missing Error mapping value in CustomerPrevalidationException for ${errorKey}`;

                  if (environment === 'staging' || environment === 'production') {
                    const Sentry = use('Sentry');

                    Sentry.captureMessage(errorMessage, {
                      contexts: {
                        error: answerErrors[errorKey],
                        question: initialAnswer.question,
                        value: initialAnswer.value,
                      },
                    });
                  }

                  Logger.info(
                    `${errorMessage} for question ${initialAnswer.question} and answer ${initialAnswer.value}`,
                  );
                  break;
              }
            });

            if (customerAnswerErrorMessages.length > 0) {
              customerErrorMessages[initialAnswer.question] = customerAnswerErrorMessages;
            }
          }
        });
      }

      errorMessages.push(customerErrorMessages);
    });

    // @ts-ignore
    super(errorMessages, 400);
  }
}
