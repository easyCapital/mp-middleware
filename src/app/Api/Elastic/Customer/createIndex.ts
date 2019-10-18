import CustomerIndex from '../../../Models/Elastic/CustomerIndex';

const ElasticClient = use('ElasticClient');

export default async function createIndex(index: CustomerIndex): Promise<void> {
  await ElasticClient.index(index);

  // todo
  // if (!response.ok) {
  //  throw new ElasticException(data);
  // }
}
