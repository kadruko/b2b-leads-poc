import { register } from "@shopify/web-pixels-extension";
import axios from 'axios';

register(({ analytics, browser, init, settings }) => {
    // Bootstrap and insert pixel script tag here

    // Sample subscribe to page view
    analytics.subscribe('page_viewed', (event) => {
      console.log('Page viewed', event);

      const url = '/apps/b2b-leads-poc';
      // fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(event)
      // });
      axios.post(url, event, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
});
