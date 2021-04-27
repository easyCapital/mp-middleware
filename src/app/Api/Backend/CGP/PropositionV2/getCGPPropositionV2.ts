import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getStudyPropositions(this: BackendApi, customer: string, study: string): Promise<any> {
  try {
    const response = await this.backendClient.get({
      url: 'proposition_v2/cgp/search',
      filters: { customer, study },
    });
    const data = await response.json();

    // let propositions: any = data;

    // if (type) {
    //   if (type === Origins.CGP) {
    //     propositions = propositions.filter((item) => item.cgp !== null);
    //   } else if (type === Origins.MIEUXPLACER) {
    //     propositions = propositions.filter((item) => item.cgp === null);
    //   }
    // }

    // const formattedPropositions: Proposition[] = [];

    // for (const proposition of propositions) {
    //   formattedPropositions.push(await getPropositionDetails(this, proposition));
    // }

    return data;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
