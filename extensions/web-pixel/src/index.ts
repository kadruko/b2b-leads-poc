import { register } from '@shopify/web-pixels-extension';
import axios from 'axios';

register(({ analytics, browser, init, settings }) => {
  // Sample subscribe to page view
  analytics.subscribe('page_viewed', (event) => {
    console.log('Page viewed', event);

    const baseUrl = settings.apiURL;
    const url = `${baseUrl}/events`;
    axios.post(url, event, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});
