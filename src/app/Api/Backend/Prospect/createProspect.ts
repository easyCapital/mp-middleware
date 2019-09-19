import EmailException from './Exceptions/EmailException';

const BackendClient = use('BackendClient');

export default async function createProspect(email: string) {
  const response = await BackendClient.post({ url: 'prospect/create' }, { email });

  const data = await response.json();

  if (!response.ok) {
    throw new EmailException(data);
  }

  return data;
}
