export enum BackendErrorTypes {
  MinValueError = 'MinValueError',
}

export type BackendError = {
  [key in BackendErrorTypes]: {
    detail: string;
    field: string[];
    value: any;
  };
};
