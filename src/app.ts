// src/app.ts

import { EventController } from './controllers/EventController';
import { EventService } from './models/EventoService';
import { EventView } from './views/EventView';

(async () => {
  const eventService = new EventService();
  const eventView = new EventView();
  const eventController = new EventController(eventService, eventView);

  await eventController.start();
})();
