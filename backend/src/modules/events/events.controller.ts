import { Controller, Post } from "@nestjs/common";
import { EventService } from "./events.service";
import { EventDto } from "./dtos/events.dto";

@Controller()
export class EventController {
    constructor(private eventService: EventService) { }

    @Post()
    async createEvent(eventData: EventDto) {
        return this.eventService.createEvent(eventData);
    }
}