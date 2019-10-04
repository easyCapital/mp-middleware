const BackendClient = use('BackendClient');

export default async function validateProposition(propositionId: string, userId: string) {
  const response = await BackendClient.post(
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
