export enum BackendErrorTypes {
  BlankError = 'BlankError',
  NotFound = 'NotFound',
  PermissionDenied = 'PermissionDenied',
  InvalidCustomerTokenError = 'InvalidCustomerTokenError',
  MissingCustomerTokenError = 'MissingCustomerTokenError',

  MinValueError = 'MinValueError',
  MaxValueError = 'MaxValueError',
  InvalidMobileFormatError = 'InvalidMobileFormatError',
  EmailAlreadyAssignedToUserError = 'EmailAlreadyAssignedToUserError',
  InvalidEmailStatus = 'InvalidEmailStatus',
  EmailValidationError = 'EmailValidationError',
  MissingMandatoryFieldsError = 'MissingMandatoryFieldsError',
}

export type BackendError = {
  [key in BackendErrorTypes]: {
    detail: string;
    fields: string[];
    value: any;
  };
};
