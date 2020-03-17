export enum BackendErrorTypes {
  BlankError = 'BlankError',
  NullError = 'NullError',
  NotFound = 'NotFound',
  PermissionDenied = 'PermissionDenied',
  InvalidTokenError = 'InvalidTokenError',
  InvalidCustomerTokenError = 'InvalidCustomerTokenError',
  InvalidCGPTokenError = 'InvalidCGPTokenError',
  MissingTokenError = 'MissingTokenError',
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

  TemporaryCustomerAlreadyExists = 'TemporaryCustomerAlreadyExists',
  EmailUniqueConstraintError = 'EmailUniqueConstraintError',
  EmailAlreadyAssignedToUserError = 'EmailAlreadyAssignedToUserError',
  ToManyEmailRevalidation = 'ToManyEmailRevalidation',
  EmailValidationError = 'EmailValidationError',
  InvalidEmailStatus = 'InvalidEmailStatus',

  InitialAmountTooLowError = 'InitialAmountTooLowError',
  InitialAmountTooHighError = 'InitialAmountTooHighError',
  InconsistentContractInitialDepositError = 'InconsistentContractInitialDepositError',
  ConstraintsError = 'ConstraintsError',

  InvalidFileTypeKeyError = 'InvalidFileTypeKeyError',
  InvalidBase64FileContentError = 'InvalidBase64FileContentError',
  UnsupportedFileContentTypeError = 'UnsupportedFileContentTypeError',
  FileTooBigError = 'FileTooBigError',

  FileAlreadySignedError = 'FileAlreadySignedError',
  SignNoFileToSignError = 'SignNoFileToSignError',
}

export type BackendError = {
  [key in BackendErrorTypes]: {
    detail: string;
    fields: string[];
    value: any;
    constraints: string[];
  };
};
