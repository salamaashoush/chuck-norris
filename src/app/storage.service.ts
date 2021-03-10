import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IStorageOperation } from './types';

/**
 * storage service abstracts storage operation from storage api
 * minimize the change on one file if we needed to change storage api
 *
 * @export
 * @class StorageService
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public changed$ = new Subject<IStorageOperation>();
  /**
   * get a key from storage
   *
   * @template T
   * @param {string} key
   * @return {*}  {(T | null)}
   * @memberof StorageService
   */
  get<T = any>(key: string): T | null {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        return JSON.parse(storedValue);
      } catch (error) {
        console.error(error);
      }
    }
    return null;
  }

  /**
   * set a key/value in storage
   *
   * @param {string} key
   * @param {*} value
   * @memberof StorageService
   */
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
    this.changed$.next({ key, value, type: 'SET' });
  }

  /**
   * remove a key from storage
   *
   * @param {string} key
   * @memberof StorageService
   */
  remove(key: string): void {
    localStorage.removeItem(key);
    this.changed$.next({ key, type: 'REMOVE' });
  }

  /**
   * check if storage has key
   *
   * @param {string} key
   * @return {boolean}
   * @memberof StorageService
   */
  hasKey(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  /**
   * clear storage
   *
   * @memberof StorageService
   */
  clear(): void {
    localStorage.clear();
    this.changed$.next({ type: 'CLEAR' });
  }
}
