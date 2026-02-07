import { Controller } from "@nestjs/common";
import { EventService } from "./events.service";

@Controller()
export class EventController {
    constructor(private eventService: EventService) { }
    
}