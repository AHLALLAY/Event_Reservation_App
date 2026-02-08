import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { EventService } from "./events.service";
import { EventDto } from "./dtos/events.dto";
import { EventStatus } from "./entity/events.entity";

@Controller()
export class EventController {
    constructor(private eventService: EventService) { }

    @Post()
    async createEvent(@Body() eventData: EventDto) {
        return this.eventService.createEvent(eventData);
    }

    @Get()
    async getEvents(@Query('status') status?:EventStatus) {
        return this.eventService.getEvents(status);
    }

    
}