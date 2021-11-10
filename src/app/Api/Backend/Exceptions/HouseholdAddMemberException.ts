import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, ErrorType, BackendError, BackendErrors } from '@robinfinance/js-api';

const Config = use('Config');
const Logger = use('Logger');

type HouseholdData = {
  email: string | null;
  answers: { question_id: string; value: string | number | null }[];
};

type MemberErrors = BackendError & { answers?: BackendErrors[] };

type MemberErrorMessages = {
  email?: ErrorType;
  DQ5?: ErrorType;
  DQ6?: ErrorType;
  DQ7?: ErrorType;
  mobile_number?: ErrorType;
};

export default class HouseholdAddMemberException extends HttpException {
  constructor(errors: MemberErrors, data: HouseholdData) {
    const environment = Config.get('sentry.environment');

    let errorMessage: string | undefined;
    const errorMessages: MemberErrorMessages = {};

    const { answers: answersErrors, ...memberErrors } = errors;

    Object.keys(memberErrors).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.EmailValidationError:
          errorMessages.email = ErrorTypes.DEFAULT;
          break;

        case BackendErrors.MissingMandatoryFieldsError:
        case BackendErrors.BlankError:
        case BackendErrors.NullError:
          errorMessages.email = ErrorTypes.REQUIRED;
          break;

        default:
          errorMessages.email = ErrorTypes.UNKNOWN;

          errorMessage = `Missing Error mapping value in HouseholdAddMemberException for ${errorKey}`;

          if (environment === 'staging' || environment === 'production') {
            const Sentry = use('Sentry');

            Sentry.captureMessage(errorMessage, {
              contexts: {
                error: {
                  error: JSON.stringify(memberErrors[errorKey]),
                  question: 'email',
                  value: data.email,
                },
              },
            });
          }

          Logger.info(errorMessage);
      }
    });

    if (answersErrors && answersErrors.length > 0) {
      answersErrors.forEach((answerErrors, index) => {
        const answerData = data.answers[index];

        Object.keys(answerErrors).forEach((errorKey) => {
          switch (errorKey) {
            case BackendErrors.MissingMandatoryFieldsError:
            case BackendErrors.BlankError:
            case BackendErrors.NullError:
              errorMessages[answerData.question_id] = ErrorTypes.REQUIRED;
              break;

            case BackendErrors.InvalidError:
              errorMessages[answerData.question_id] = ErrorTypes.INVALID;
              break;

            case BackendErrors.InvalidPhoneFormatError:
            case BackendErrors.InvalidLandlineFormatError:
              errorMessages[answerData.question_id] = ErrorTypes.INVALID_PHONE_NUMBER;
              break;

            case BackendErrors.InvalidMobileFormatError:
              errorMessages[answerData.question_id] = ErrorTypes.INVALID_MOBILE_NUMBER;
              break;

            default:
              errorMessages[answerData.question_id] = ErrorTypes.UNKNOWN;

              errorMessage = `Missing Error mapping value in HouseholdAddMemberException for ${errorKey}`;

              if (environment === 'staging' || environment === 'production') {
                const Sentry = use('Sentry');

                Sentry.captureMessage(errorMessage, {
                  contexts: {
                    error: {
                      error: JSON.stringify(answerErrors[errorKey]),
                      question: answerData.question_id,
                      value: answerData.value,
                    },
                  },
                });
              }

              Logger.info(errorMessage);
          }
        });
      });
    }

    // @ts-ignore
    super(errorMessages, 400);
  }
}
