const SymfonyClient = use('SymfonyClient');

export default async function validateProposition(propositionId: string, sessionCookie: string) {
  const response = await SymfonyClient.post(
    { url: 'contract/validate', sessionCookie },
    { proposition: propositionId },
  );

  console.log(response);

  if (!response.ok) {
    const data = await response.json();
    return data;
    // throw new ProspectException(data);
  }
}
