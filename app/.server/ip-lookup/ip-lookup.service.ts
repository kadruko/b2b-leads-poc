import { IpInfo, IpInfoDto, IpLookupLocalization } from './ip-info';
import { ipLookupApi } from './ip-lookup.api';

class IpLookupService {
  public async lookup(ip: string): Promise<IpInfo> {
    const path = `/${ip}`;
    const fields: (keyof IpInfoDto)[] = [
      'status',
      'message',
      'continentCode',
      'countryCode',
      'region',
      'city',
      'district',
      'zip',
      'lat',
      'lon',
      'timezone',
      'isp',
      'org',
      'as',
      'asname',
      'mobile',
      'proxy',
      'hosting',
      'reverse',
    ];
    const lang = IpLookupLocalization.ENGLISH;
    return await ipLookupApi.get<IpInfoDto>(path, fields, lang);
  }
}

export const ipLookupService = new IpLookupService();
