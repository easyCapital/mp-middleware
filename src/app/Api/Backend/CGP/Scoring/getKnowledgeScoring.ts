import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getKnowledgeScoring(
  this: BackendApi,
  customerId: string | number,
  studyId: string | number,
  universe: string,
): Promise<{ score: string }> {
  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/customer/${customerId}/study/${studyId}/get_knowledge_scoring`,
      },
      {
        universe,
      },
    );

    const data = await response.json();

    return { score: data.knowledge_scoring };
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
