import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, ErrorType, BackendError, BackendErrors } from '@robinfinance/js-api';

const Config = use('Config');
const Logger = use('Logger');

type HouseholdData = {
  name?: string;
  members: {
    email: string | null;
    is_main_contact?: boolean;
    answers: { question_id: string; value: string | number | null }[];
  }[];
};

type MemberErrors = BackendError & { answers?: BackendErrors[] };

type HouseholdErrors = BackendError & {
  members?: MemberErrors[];
};

type MemberErrorMessages = { [key: string]: ErrorType[] } & {
  email?: ErrorType[];
};

type HouseholdErrorMessages = {
  members?: MemberErrorMessages[];
};

export default class HouseholdPrevalidationException extends HttpException {
  constructor(errors: HouseholdErrors[], data: HouseholdData[]) {
    const environment = Config.get('sentry.environment');

    let errorMessage: string | undefined;
    const errorMessages: HouseholdErrorMessages[] = [];

    errors.forEach((error, index) => {
      const householdErrorMessages: HouseholdErrorMessages = {};
      const householdData = data[index];

      const { members: membersErrors } = error;

      if (membersErrors && membersErrors.length > 0) {
        householdErrorMessages.members = [];

        membersErrors.forEach(({ answers: answersErrors, ...memberErrors }, index) => {
          const memberData = householdData.members[index];

          const memberErrorMessages: MemberErrorMessages = {};
          const memberEmailErrorMessages: ErrorType[] = [];

          Object.keys(memberErrors).forEach((errorKey) => {
            switch (errorKey) {
              case BackendErrors.EmailValidationError:
                memberEmailErrorMessages.push(ErrorTypes.DEFAULT);
                break;

              case BackendErrors.EmailUniqueConstraintError:
                memberEmailErrorMessages.push(ErrorTypes.USER_EXISTS);
                break;

              case BackendErrors.MissingMandatoryFieldsError:
              case BackendErrors.BlankError:
              case BackendErrors.NullError:
                memberEmailErrorMessages.push(ErrorTypes.REQUIRED);
                break;

              default:
                memberEmailErrorMessages.push(ErrorTypes.UNKNOWN);

                errorMessage = `Missing Error mapping value in HouseholdPrevalidationException for ${errorKey}`;

                if (environment === 'staging' || environment === 'production') {
                  const Sentry = use('Sentry');

                  Sentry.captureMessage(errorMessage, {
                    contexts: {
                      error: {
                        error: JSON.stringify(memberErrors[errorKey]),
                        question: 'email',
                        value: memberData.email,
                      },
                    },
                  });
                }

                Logger.info(errorMessage);
            }
          });

          if (memberEmailErrorMessages.length > 0) {
            memberErrorMessages.email = memberEmailErrorMessages;
          }

          if (answersErrors && answersErrors.length > 0) {
            answersErrors.forEach((answerErrors, index) => {
              const answerErrorMessages: ErrorType[] = [];
              const answerData = memberData.answers[index];

              Object.keys(answerErrors).forEach((errorKey) => {
                switch (errorKey) {
                  case BackendErrors.MissingMandatoryFieldsError:
                  case BackendErrors.BlankError:
                  case BackendErrors.NullError:
                    answerErrorMessages.push(ErrorTypes.REQUIRED);
                    break;

                  case BackendErrors.InvalidChoiceError:
                    break;

                  case BackendErrors.InvalidError:
                    answerErrorMessages.push(ErrorTypes.INVALID);
                    break;

                  case BackendErrors.MinValueError:
                  case BackendErrors.MinimumLengthError:
                    answerErrorMessages.push(ErrorTypes.MIN);
                    break;

                  case BackendErrors.MaxValueError:
                  case BackendErrors.MaximumLengthError:
                    answerErrorMessages.push(ErrorTypes.MAX);
                    break;

                  case BackendErrors.NotFound:
                    answerErrorMessages.push(ErrorTypes.UNKNOWN);
                    break;

                  case BackendErrors.InvalidPhoneFormatError:
                  case BackendErrors.InvalidLandlineFormatError:
                    answerErrorMessages.push(ErrorTypes.INVALID_PHONE_NUMBER);
                    break;

                  case BackendErrors.InvalidMobileFormatError:
                    answerErrorMessages.push(ErrorTypes.INVALID_MOBILE_NUMBER);
                    break;

                  default:
                    answerErrorMessages.push(ErrorTypes.UNKNOWN);

                    errorMessage = `Missing Error mapping value in HouseholdPrevalidationException for ${errorKey}`;

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

              if (answerErrorMessages.length > 0) {
                memberErrorMessages[answerData.question_id] = answerErrorMessages;
              }
            });
          }

          householdErrorMessages.members?.push(memberErrorMessages);
        });
      }

      errorMessages.push(householdErrorMessages);
    });

    // @ts-ignore
    super(errorMessages, 400);
  }
}
