import fetchMock from 'fetch-mock';
import { Assert } from '../../../typings/@adonisjs';

export function assertLastCall(
  assert: Assert,
  uriFilter: string,
  method: string,
  body: {
    token: string;
  },
) {
  const lastOptions: any = fetchMock.lastOptions(uriFilter);
  if (lastOptions) {
    assert.equal(lastOptions.method, method);
    if (lastOptions.body) {
      assert.deepEqual(JSON.parse(lastOptions.body), body);
    } else {
      assert.fail(`Expecting body in the call ${lastOptions}`);
    }
  } else {
    assert.fail(`Expecting a call matching URI filter ${uriFilter}`);
  }
}

export function assertLastHeader(assert: Assert, uriFilter: string, headerName: string, expectedValue: string) {
  const lastOptions = fetchMock.lastOptions(uriFilter);
  if (lastOptions) {
    if (lastOptions.headers) {
      // We must ignore TS checking on the next line because the FetchMock type hasn't got the right header type.
      // It expects an object but we use a Header type which is a Map.
      // @ts-ignore
      assert.equal(lastOptions.headers.get(headerName), expectedValue);
    } else {
      assert.fail(`Expecting headers in the call ${lastOptions}`);
    }
  } else {
    assert.fail(`Expecting a call matching URI filter ${uriFilter}`);
  }
}
