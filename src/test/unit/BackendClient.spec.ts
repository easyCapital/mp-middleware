import fetchMock from 'fetch-mock';
const { ioc } = require('@adonisjs/fold');
const { test, afterEach, trait } = ioc.use('Test/Suite')('Proposition controller');

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
  assert: any,
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
  assertLastHeader(uriFilter, assert, 'Authorization', `token ${backendApiToken}`);
}

function assertLastHeader(uriFilter: string, assert: any, headerName: string, expectedValue: string) {
  const lastOptions = fetchMock.lastOptions(uriFilter);
  if (lastOptions && lastOptions.headers) {
    assert.equal(lastOptions.headers[headerName], expectedValue);
  } else {
    assert.fail('Should have headers in last options');
  }
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
