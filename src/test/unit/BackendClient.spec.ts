import fetchMock from 'fetch-mock';
import { assertLastHeader } from './utils';
import { Suite, Assert } from '../../../typings/@adonisjs';
import { ioc } from '@adonisjs/fold';

const { test, afterEach, trait }: Suite = ioc.use('Test/Suite')('BackendClient');

trait('Test/ApiClient');

afterEach(async () => {
  fetchMock.reset();
});

test('validate mieuxplacer backend API token', async ({ assert, client }) => {
  await assertBackendApiTokenFromOrigin(client, assert, 'http://mif.mieuxplacer.local', 'mieuxplacerbackendapitoken');
});

test('validate afi backend API token', async ({ assert, client }) => {
  await assertBackendApiTokenFromOrigin(client, assert, 'http://mif.afi.local', 'afibackendapitoken');
});

async function assertBackendApiTokenFromOrigin(
  client: any,
  assert: Assert,
  originHeader: string,
  backendApiToken: string,
) {
  mockPrismic();

  fetchMock.get('http://backoffice.test/api/proposition/get/token/42', { answers: [], contents: [], risk_advice: 3 });
  fetchMock.get('http://backoffice.test/api/portfolio/search', []);

  const response = await client
    .get('/api/1.0/proposition/42')
    .header('Origin', originHeader)
    .end();

  assert.equal(response.status, 200);

  const uriFilter = 'begin:http://backoffice.test/api/proposition';

  assert.equal(fetchMock.lastUrl(uriFilter), 'http://backoffice.test/api/proposition/get/token/42');

  assertLastHeader(assert, uriFilter, 'Authorization', `token ${backendApiToken}`);
}

function mockPrismic() {
  ioc.fake('PrismicClient', () => {
    return {
      query() {
        return { results: [] };
      },
    };
  });
}
