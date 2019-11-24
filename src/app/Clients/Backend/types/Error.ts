export enum BackendErrorTypes {
  BlankError = 'BlankError',
  NotFound = 'NotFound',
  PermissionDenied = 'PermissionDenied',
  InvalidCustomerTokenError = 'InvalidCustomerTokenError',
  InvalidCGPTokenError = 'InvalidCGPTokenError',
  MissingCustomerTokenError = 'MissingCustomerTokenError',
  InvalidCredentialsError = 'InvalidCredentialsError',

  MinValueError = 'MinValueError',
  MaxValueError = 'MaxValueError',

  MinimumLengthError = 'MinimumLengthError',
  MissingMandatoryFieldsError = 'MissingMandatoryFieldsError',

  InvalidMobileFormatError = 'InvalidMobileFormatError',

  UserAttributeSimilarityError = 'UserAttributeSimilarityError',
  CommonPasswordError = 'CommonPasswordError',
  NumericPasswordError = 'NumericPasswordError',

  EmailUniqueConstraintError = 'EmailUniqueConstraintError',
  EmailAlreadyAssignedToUserError = 'EmailAlreadyAssignedToUserError',
  ToManyEmailRevalidation = 'ToManyEmailRevalidation',
  EmailValidationError = 'EmailValidationError',
  InvalidEmailStatus = 'InvalidEmailStatus',
}

export type BackendError = {
  [key in BackendErrorTypes]: {
    detail: string;
    fields: string[];
    value: any;
  };
};
