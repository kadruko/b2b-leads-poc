export type IpInfo = Omit<
  IpInfoDto,
  'query' | 'continent' | 'country' | 'regionName' | 'offset'
>;

export type IpInfoDto = {
  query: string; // IP address
  status: IpLookupStatus;
  message?: string; // only present if status is fail
  continent: string; // North America
  continentCode: string; // NA
  country: string; // United States
  countryCode: string; // US
  region: string; // CA
  regionName: string; // California
  city: string; // Mountain View
  district: string; // Old Mountain View
  zip: string; // 94043
  lat: number; // 37.388019
  lon: number; // -122.074310
  timezone: string; // America/Los_Angeles
  offset: number; // -25200
  isp: string; // Google Cloud
  org: string; // Google Cloud
  as: string; // AS15169 Google Inc.
  asname: string; // GOOGLE
  reverse: string; //
  mobile: boolean; // false
  proxy: boolean; // false
  hosting: boolean; // true
};

export enum IpLookupStatus {
  SUCCESS = 'success',
  FAIL = 'fail',
}

export enum IpLookupLocalization {
  ENGLISH = 'en',
  GERMAN = 'de',
  SPANISH = 'es',
  PORTUGUESE = 'pt-BR',
  FRENCH = 'fr',
  JAPANESE = 'ja',
  CHINESE = 'zh-CN',
  RUSSIAN = 'ru',
}
