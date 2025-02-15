export type WebPixelEvent = {
  id: string;
  name: string;
  data: any;
  type: string;
  timestamp: string;
  context: {
    document: {
      location: {
        href: string;
        hash: string;
        host: string;
        hostname: string;
        origin: string;
        pathname: string;
        port: string;
        protocol: string;
        search: string;
      };
      referrer: string;
      characterSet: string;
      title: string;
    };
    navigator: {
      language: string;
      cookieEnabled: boolean;
      languages: string[];
      userAgent: string;
    };
    window: {
      innerHeight: number;
      innerWidth: number;
      outerHeight: number;
      outerWidth: number;
      pageXOffset: number;
      pageYOffset: number;
      location: {
        href: string;
        hash: string;
        host: string;
        hostname: string;
        origin: string;
        pathname: string;
        port: string;
        protocol: string;
        search: string;
      };
      origin: string;
      screen: {
        height: number;
        width: number;
      };
      screenX: number;
      screenY: number;
      scrollX: number;
      scrollY: number;
    };
  };
  seq: number;
  clientId: string;
};
