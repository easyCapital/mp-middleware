export enum BackendErrorTypes {
  BlankError = 'BlankError',
  NotFound = 'NotFound',
  MinValueError = 'MinValueError',
  MaxValueError = 'MaxValueError',
  InvalidMobileFormatError = 'InvalidMobileFormatError',
  EmailAlreadyAssignedToUserError = 'EmailAlreadyAssignedToUserError',
  InvalidEmailStatus = 'InvalidEmailStatus',
}

export type BackendError = {
  [key in BackendErrorTypes]: {
    detail: string;
    field: string[];
    value: any;
  };
};
