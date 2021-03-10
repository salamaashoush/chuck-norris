/**
 * joke api model
 *
 * @export
 * @interface IJoke
 */
export interface IJoke {
  id: number;
  joke: string;
  categories: string[];
}

/**
 * generic api response type
 *
 * @export
 * @interface IApiResponse
 * @template T
 */
export interface IApiResponse<T> {
  type: 'success' | 'error';
  value: T;
}

/**
 * storage operation event triggered when we modify storage
 *
 * @export
 * @interface IStorageOperation
 */
export interface IStorageOperation {
  type: 'SET' | 'REMOVE' | 'CLEAR';
  key?: string;
  value?: any;
}
