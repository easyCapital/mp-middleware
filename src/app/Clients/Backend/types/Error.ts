export enum BackendErrorTypes {
  BlankError = 'BlankError',
  NotFound = 'NotFound',
  MinValueError = 'MinValueError',
  MaxValueError = 'MaxValueError',
}

export type BackendError = {
  [key in BackendErrorTypes]: {
    detail: string;
    field: string[];
    value: any;
  };
};
