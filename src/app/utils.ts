import { environment } from 'src/environments/environment';

export function buildApiUrl(path: string, baseUrl = environment.apiUrl): string {
  return `${baseUrl}/${path}`.replace(/([^:]\/)\/+/g, '$1');
}
