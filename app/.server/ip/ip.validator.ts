import { IpInfo } from '../ip-lookup/ip-info';

class IpValidator {
  public validate({ mobile, proxy, hosting }: IpInfo): void {
    if (mobile) {
      throw new Error('Mobile IP addresses are not allowed');
    }
    if (proxy) {
      throw new Error('Proxy IP addresses are not allowed');
    }
    if (hosting) {
      throw new Error('Hosting IP addresses are not allowed');
    }
  }
}

export const ipValidator = new IpValidator();
