import { Filters } from '@robinfinance/js-api';

import { Proposition } from '../../../../Models/Proposition';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';
import { getPropositionDetails } from '../../Helpers';

export default async function getStudyPropositions(
  this: BackendApi,
  customerId: string,
  studyId: string,
  filters?: Filters,
): Promise<Proposition[]> {
  try {
    const response = await this.backendClient.get({
      url: 'proposition/cgp/search',
      filters: filters
        ? { ...filters, user_id: customerId, study_id: studyId }
        : { user_id: customerId, study_id: studyId },
      orderBy: { key: 'created', type: 'desc' },
    });
    const data = await response.json();

    const formattedPropositions: Proposition[] = [];

    for (const proposition of data) {
      formattedPropositions.push(await getPropositionDetails(this, proposition));
    }

    return formattedPropositions;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
