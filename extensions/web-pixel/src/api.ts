import axios from 'axios';
import { Settings } from './settings';

class Api {
  public async post(settings: Settings, path: string, data: any): Promise<any> {
    const url = this.getUrl(settings, path);
    const headers = this.getHeaders();
    return await axios.post(url, data, {
      headers,
    });
  }

  private getUrl(settings: any, path: string): string {
    return `${settings.apiURL}/${path}`;
  }

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
    };
  }
}

export const api = new Api();
