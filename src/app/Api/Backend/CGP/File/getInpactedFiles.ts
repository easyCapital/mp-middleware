import { QuestionAnswer } from '@robinfinance/js-api';

import { File } from '../../../../Models/File';
import { Exception } from '../../../../Exceptions';
import { BackendException, AnswerException } from '../../Exceptions';
import { formatAnswerBody } from '../../Helpers';
import BackendApi from '../..';

export default async function getInpactedFiles(
  this: BackendApi,
  customerId: number | string,
  studyId: number | string,
  answers: QuestionAnswer,
  contractId?: number | string,
): Promise<File[]> {
  const formattedAnswers = formatAnswerBody(answers);

  let url: string = `cgp/customer/${customerId}/study/${studyId}/files/get_answer_impact`;

  if (contractId) {
    url = `cgp/customer/${customerId}/study/${studyId}/contract/${contractId}/files/get_answer_impact`;
  }

  try {
    const response = await this.backendClient.post(
      {
        url,
      },
      formattedAnswers,
    );

    const data = await response.json();

    const files = data.map((item) => new File(item));

    return files;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      if (exception.status === 400) {
        throw new AnswerException(formattedAnswers, error);
      }

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
