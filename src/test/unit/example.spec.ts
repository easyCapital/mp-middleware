const fetchMock = require('fetch-mock');
const { test } = use('Test/Suite')('Example unit test')
const BackendClient = use('BackendClient')

test('validate backend get', async ({ assert }) => {
  fetchMock.get('http://backoffice.test/api/myurl', 200);
  const response = await BackendClient.get({
    url: 'myurl'
  })

  assert.equal(response.url, "http://backoffice.test/api/myurl")
  assert.equal(response.status, 200)
})