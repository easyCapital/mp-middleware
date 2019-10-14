import BackendApi from '..';

export default async function validateProposition(this: BackendApi, propositionId: string, userId: string) {
  const response = await this.backendClient.post(
    { url: 'contract/create_from_proposition' },
    { proposition: propositionId, user: userId },
  );

  const data = await response.json();

  if (!response.ok) {
    return data;
    // throw new ProspectException(data);
  }

  return data;
}
