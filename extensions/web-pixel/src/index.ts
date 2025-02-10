import { register } from '@shopify/web-pixels-extension';
import { eventService } from './event.service';
import { Settings } from './settings';

register(({ analytics, settings }) => {
  analytics.subscribe('all_standard_events', (event) => {
    eventService.create(settings as Settings, event);
  });
});
