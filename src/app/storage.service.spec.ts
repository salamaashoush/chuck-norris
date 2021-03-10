import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set a key/value and fire and event', () => {
    service.changed$.pipe(first()).subscribe(event => {
      expect(event.type).toEqual('SET');
      expect(event.value?.name).toEqual('test');
    });
    service.set('test', { name: 'test' });
    expect(localStorage.getItem('test')).toBeTruthy();
  });

  it('should get a key', () => {
    service.set('test', { name: 'test' });
    const value = service.get('test');
    expect(value.name).toEqual('test');
  });

  it('should remove a key', () => {
    service.set('test', { name: 'test' });
    service.remove('test');
    const value = service.get('test');
    expect(value).toBeFalsy();
  });
});
