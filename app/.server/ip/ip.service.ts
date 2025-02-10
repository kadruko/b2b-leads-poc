import { getClientIPAddress } from 'remix-utils/get-client-ip-address';

class IpService {
  public async fromRequest(request: Request): Promise<string> {
    const ip = getClientIPAddress(request);
    console.log('CLIENT_IP', ip);
    if (!ip) {
      throw new Error('Failed to determine client IP address');
    }
    return ip;
  }
}

export const ipService = new IpService();
