import { Proposition } from '../../../../Models/Proposition';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';
import { getPropositionDetails } from '../../Helpers';

export default async function getStudyProposition(
  this: BackendApi,
  customerId: string,
  studyId: string,
): Promise<Proposition | undefined> {
  try {
    const response = await this.backendClient.get({
      url: 'proposition/cgp/search',
      filters: { user_id: customerId, study_id: studyId },
      orderBy: { key: 'created', type: 'desc' },
    });
    const data = await response.json();

    if (data.length > 0) {
      return getPropositionDetails(this, data[0]);
    }
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
