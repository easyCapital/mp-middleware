import fetchMock from 'fetch-mock';
export function assertLastCall(
  assert: any,
  url: string,
  method: string,
  body: {
    token: string;
  },
) {
  assert.equal(fetchMock.lastUrl(), url);
  const lastOptions: any = fetchMock.lastOptions();
  if (lastOptions) {
    assert.equal(lastOptions.method, method);
    if (lastOptions.body) {
      assert.deepEqual(JSON.parse(lastOptions.body), body);
    } else {
      assert.fail(`Expecting body in lastOptions ${lastOptions}`);
    }
  } else {
    assert.fail(`Expecting options in last call to ${url}`);
  }
}
