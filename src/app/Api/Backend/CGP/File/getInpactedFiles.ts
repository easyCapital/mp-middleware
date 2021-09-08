import { Answer } from '@robinfinance/js-api';

import { File } from '../../../../Models/File';
import { Exception } from '../../../../Exceptions';
import { BackendException, AnswerException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getInpactedFiles(
  this: BackendApi,
  customerId: number | string,
  studyId: number | string,
  answers: Answer[],
  contractId?: number | string,
): Promise<File[]> {
  let url = `cgp/customer/${customerId}/study/${studyId}/files/get_answer_impact`;

  if (contractId) {
    url = `cgp/customer/${customerId}/study/${studyId}/contract/${contractId}/files/get_answer_impact`;
  }

  try {
    const response = await this.backendClient.post(
      {
        url,
      },
      answers,
    );

    const data = await response.json();

    const files = data.map((item) => new File(item));

    return files;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      if (exception.status === 400) {
        throw new AnswerException(answers, error);
      }

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
