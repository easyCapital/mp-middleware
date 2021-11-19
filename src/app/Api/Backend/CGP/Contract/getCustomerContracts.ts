import { Filters } from '@robinfinance/js-api';

import { Contract } from '../../../../Models/Contract';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getCustomerContracts(
  this: BackendApi,
  studyId?: string,
  filters?: Filters,
): Promise<Contract[]> {
  const url = studyId ? `study/${studyId}/contract/search` : 'contract/cgp/search';

  try {
    const response = await this.backendClient.get({
      url,
      filters,
      orderBy: { key: 'date_created', type: 'desc' },
    });
    const data = await response.json();

    const contracts: Contract[] = data.map((item) => new Contract(item));

    if (studyId) {
      const propositionV1Ids: number[] = [];
      const propositionV2Ids: number[] = [];

      data.forEach((item) => {
        if (item.proposition) {
          propositionV1Ids.push(item.proposition);
        } else if (item.proposition_v2) {
          propositionV2Ids.push(item.proposition_v2);
        }
      });

      if (propositionV1Ids.length > 0) {
        const uniquePropositionV1Ids = propositionV1Ids.filter((value, index, array) => array.indexOf(value) === index);
        const propositionV1s = await this.getCGPStudyPropositions(studyId, {
          pk__in: uniquePropositionV1Ids,
        });

        contracts.forEach((contract) => {
          const proposition = propositionV1s.find((item) => item.id === contract.propositionId);

          if (proposition) {
            contract.proposition = proposition;
          }
        });
      }

      if (propositionV2Ids.length > 0) {
        const uniquePropositionV2Ids = propositionV2Ids.filter((value, index, array) => array.indexOf(value) === index);
        const propositionV2s = await this.getCGPPropositionV2(studyId, {
          pk__in: uniquePropositionV2Ids,
        });

        contracts.forEach((contract) => {
          const proposition = propositionV2s.find((item) => item.id === contract.propositionId);

          if (proposition) {
            contract.proposition = proposition;
          }
        });
      }
    }

    return contracts;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
