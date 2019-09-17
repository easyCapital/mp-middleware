import { HttpException } from '@adonisjs/generic-exceptions';

import { BackendError } from '../../../../Clients/Backend/types';

export default class AnswerException extends HttpException {
  constructor(answers: { question: string; value: string }[], errors: BackendError[]) {
    super(JSON.stringify(errors), 400);
  }
}
