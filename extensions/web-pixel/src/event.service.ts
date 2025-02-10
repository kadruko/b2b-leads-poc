import { api } from './api';
import { Settings } from './settings';

class EventService {
  public static EVENTS_PATH = 'events';

  public async create(settings: Settings, event: any): Promise<any> {
    return await api.post(settings, EventService.EVENTS_PATH, event);
  }
}

export const eventService = new EventService();
