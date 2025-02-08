import axios from 'axios';
import { Cache, createCache } from 'cache-manager';
import { IpInfoDto, IpLookupLocalization } from './ip-info';

class IpLookupApi {
  public static BASE_URL = 'http://ip-api.com/json';
  private readonly cache: Cache;

  constructor() {
    this.cache = createCache({
      ttl: 600000, // 10min in ms
    });
  }

  public async get<T>(
    path: string,
    fields: (keyof IpInfoDto)[],
    lang?: IpLookupLocalization,
  ): Promise<T> {
    const fieldQuery = `fields=${fields.join(',')}`;
    const langQuery = lang ? `lang=${lang}` : '';
    const query = [fieldQuery, langQuery].filter(Boolean).join('&');
    const url = `${IpLookupApi.BASE_URL}${path}?${query}`;

    console.log('Request to IP lookup API:', url);

    let data = await this.cache.get<T>(url);
    if (data) {
      console.log('Cache hit for IP lookup API:', url);
    } else {
      console.log('Cache miss for IP lookup API:', url);
      const response = await axios.get(url);
      data = response.data;
      await this.cache.set(url, data);
    }
    return data as T;
  }
}

export const ipLookupApi = new IpLookupApi();
