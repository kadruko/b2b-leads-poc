import { register } from '@shopify/web-pixels-extension';
import axios from 'axios';

register(({ analytics, browser, init, settings }) => {
  // Bootstrap and insert pixel script tag here

  // Sample subscribe to page view
  analytics.subscribe('page_viewed', (event) => {
    console.log('Page viewed', event);

    // const url = 'https://localhost:3000/events';
    const url = 'https://shopify-b2b-leads.glowsoft.de/events';
    axios.post(url, event, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});
