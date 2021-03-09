import { buildApiUrl } from './utils';

describe('Utils -> buildApiUrl', () => {
  it('should build correct url', () => {
    expect(buildApiUrl('/test/1', 'https:test.com/api')).toEqual('https:test.com/api/test/1');
  });

  it('should remove duplicate slashes', () => {
    expect(buildApiUrl('/test/1', 'https:test.com/api/')).toEqual('https:test.com/api/test/1');
  });
});
