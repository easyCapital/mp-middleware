// import { Origin, Origins } from '@robinfinance/js-api';

// import { Proposition } from '../../../../Models/Proposition';
// import { Exception } from '../../../../Exceptions';
// import { BackendException } from '../../Exceptions';
// import BackendApi from '../..';
// import { getPropositionDetails } from '../../Helpers';

// export default async function getStudyPropositions(
//   this: BackendApi,
//   customerId: string,
//   filters: string,
// ): Promise<Proposition[]> {
//   try {
//     const response = await this.backendClient.get({
//       url: 'proposition/cgp/search',
//       filters: { id },
//     });
//     const data = await response.json();
//     const response = await this.backendClient.get({
//       url: 'proposition/cgp/search',
//       filters: { user_id: customerId, study_id: studyId },
//       orderBy: { key: 'created', type: 'desc' },
//     });
//     const data = await response.json();

//     let propositions: any = data;

//     if (type) {
//       if (type === Origins.CGP) {
//         propositions = propositions.filter((item) => item.cgp !== null);
//       } else if (type === Origins.MIEUXPLACER) {
//         propositions = propositions.filter((item) => item.cgp === null);
//       }
//     }

//     const formattedPropositions: Proposition[] = [];

//     for (const proposition of propositions) {
//       formattedPropositions.push(await getPropositionDetails(this, proposition));
//     }

//     return formattedPropositions;
//   } catch (exception) {
//     if (typeof exception.json === 'function') {
//       const error = await exception.json();

//       throw new BackendException(error);
//     }

//     throw new Exception(exception);
//   }
// }
