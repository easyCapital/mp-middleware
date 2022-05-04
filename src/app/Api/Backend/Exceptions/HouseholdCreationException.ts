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
    customer_status: number | null | undefined;
  }[];
};

type MemberErrors = BackendError & { answers?: BackendErrors[] };

type HouseholdErrors = BackendError & {
  members?: MemberErrors[];
};

type MemberErrorMessages = {
  email?: ErrorType;
  DQ5?: ErrorType;
  DQ6?: ErrorType;
  DQ7?: ErrorType;
  mobile_number?: ErrorType;
  customer_status?: ErrorType;
};

type HouseholdErrorMessages = {
  members?: MemberErrorMessages[];
};

export default class HouseholdCreationException extends HttpException {
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

          Object.entries(memberErrors).forEach((errorKey) => {
            switch (errorKey[0]) {
              case BackendErrors.EmailValidationError:
                errorKey[1].fields.forEach((field) => {
                  memberErrorMessages[field] = ErrorTypes.DEFAULT;
                });
                break;

              case BackendErrors.MissingMandatoryFieldsError:
              case BackendErrors.InvalidError:
              case BackendErrors.BlankError:
              case BackendErrors.NullError:
                errorKey[1].fields.forEach((field) => {
                  memberErrorMessages[field] = ErrorTypes.REQUIRED;
                });
                break;

              default:
                errorKey[1].fields.forEach((field) => {
                  memberErrorMessages[field] = ErrorTypes.UNKNOWN;
                });

                errorMessage = `Missing Error mapping value in HouseholdCreationException for ${errorKey}`;

                if (environment === 'staging' || environment === 'production') {
                  const Sentry = use('Sentry');

                  Sentry.captureMessage(errorMessage, {
                    contexts: {
                      error: {
                        error: JSON.stringify(memberErrors[errorKey[1]['fields'][0]]),
                        question: 'email',
                        value: memberData.email,
                      },
                    },
                  });
                }

                Logger.info(errorMessage);
            }
          });

          if (answersErrors && answersErrors.length > 0) {
            answersErrors.forEach((answerErrors, index) => {
              const answerData = memberData.answers[index];

              Object.keys(answerErrors).forEach((errorKey) => {
                switch (errorKey) {
                  case BackendErrors.MissingMandatoryFieldsError:
                  case BackendErrors.BlankError:
                  case BackendErrors.NullError:
                    memberErrorMessages[answerData.question_id] = ErrorTypes.REQUIRED;
                    break;

                  case BackendErrors.InvalidError:
                    memberErrorMessages[answerData.question_id] = ErrorTypes.INVALID;
                    break;

                  case BackendErrors.InvalidPhoneFormatError:
                  case BackendErrors.InvalidLandlineFormatError:
                    memberErrorMessages[answerData.question_id] = ErrorTypes.INVALID_PHONE_NUMBER;
                    break;

                  case BackendErrors.InvalidMobileFormatError:
                    memberErrorMessages[answerData.question_id] = ErrorTypes.INVALID_MOBILE_NUMBER;
                    break;

                  default:
                    memberErrorMessages[answerData.question_id] = ErrorTypes.UNKNOWN;

                    errorMessage = `Missing Error mapping value in HouseholdCreationException for ${errorKey}`;

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

          householdErrorMessages.members?.push(memberErrorMessages);
        });
      }

      errorMessages.push(householdErrorMessages);
    });

    // @ts-ignore
    super(errorMessages, 400);
  }
}
