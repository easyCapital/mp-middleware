import fetchMock from 'fetch-mock';
import { assertLastCall } from './utils';
import { ioc } from '@adonisjs/fold';
const { test, afterEach, trait } = ioc.use('Test/Suite')('Proposition controller');

trait('Test/ApiClient');

afterEach(async () => {
  fetchMock.reset();
});

test('validate send proposition by email through Symfony', async ({ assert, client }) => {
  fetchMock.post('http://backoffice.test/api/recommendation/customer/generate_prospect_proposition', {
    token: 'a-proposition-token',
  });
  fetchMock.get('http://backoffice.test/api/proposition/get/token/a-proposition-token', { answers: [], contents: [] });
  fetchMock.post('http://symfony.test/api/2.0/onboarding/recommendation/send', 200);
  const response = await client
    .post('/api/1.0/proposition/generate')
    .header('Origin', 'http://mif.mieuxplacer.local')
    .send({ answers: [] })
    .end();
  assert.equal(response.status, 200);
  assertLastCall(assert, 'http://symfony.test/api/2.0/onboarding/recommendation/send', 'POST', {
    token: 'a-proposition-token',
  });
});
