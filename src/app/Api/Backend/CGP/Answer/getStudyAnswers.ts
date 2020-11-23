import { Filters } from '@robinfinance/js-api';

import { Answer } from '../../../../Models/Answer';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getStudyAnswers(
  this: BackendApi,
  studyId: string | number,
  filters?: Filters,
  latestBy?: string,
): Promise<Answer[]> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/answer/search',
      filters: filters ? { ...filters, study_answers__study: studyId } : { study_answers__study: studyId },
      latestBy,
    });
    const data = await response.json();

    const answers = data.map((item) => new Answer(item));

    return answers;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
