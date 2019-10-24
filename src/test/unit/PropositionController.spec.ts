import fetchMock from 'fetch-mock';
import { ioc } from '@adonisjs/fold';
import { Suite } from '../../../typings/@adonisjs';
import { assertLastCall, assertLastHeader } from './utils';
const { test, afterEach, beforeEach, trait }: Suite = ioc.use('Test/Suite')('Proposition controller');

trait('Test/ApiClient');

afterEach(async () => {
  fetchMock.reset();
});

beforeEach(async () => {
  fetchMock.post('http://backoffice.test/api/recommendation/customer/generate_prospect_proposition', {
    token: 'a-proposition-token',
  });
  fetchMock.post('http://backoffice.test/api/recommendation/customer/generate_proposition', {
    token: 'a-proposition-token',
  });
  fetchMock.get('http://backoffice.test/api/proposition/get/token/a-proposition-token', { answers: [], contents: [] });
  fetchMock.post('http://symfony.test/api/2.0/onboarding/recommendation/send', 200);
});

test('validate send proposition by email through Symfony', async ({ assert, client }) => {
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

test('validate calls symfony with authentication if available', async ({ assert, client }) => {
  const response = await client
    .post('/api/1.0/proposition/generate')
    .header('Origin', 'http://mif.mieuxplacer.local')
    .header('Authorization', 'd80b4f723831343677db945941989aa315c5fd7c')
    .end();

  assert.equal(response.status, 200);

  assertLastHeader(
    assert,
    'http://symfony.test/api/2.0/onboarding/recommendation/send',
    'Authorization',
    'd80b4f723831343677db945941989aa315c5fd7c',
  );
});
