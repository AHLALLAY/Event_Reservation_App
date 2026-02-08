import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { EventService } from "./events.service";
import { EventDto } from "./dtos/events.dto";
import { EventStatus } from "./entity/events.entity";

@Controller('events')
export class EventController {
    constructor(private eventService: EventService) { }

    @Post('event')
    async createEvent(@Body() eventData: EventDto) {
        return this.eventService.createEvent(eventData);
    }

    @Get()
    async getEvents(@Query('status') status?: EventStatus) {
        return this.eventService.getEvents(status);
    }

    @Get(':id')
    async getEventById(@Param('id') eventId: string) {
        return this.eventService.getEventById(eventId);
    }

    @Put('event/:id')
    async updateEvent(@Param('id') eventId: string, @Body() newData: EventDto) {
        return this.eventService.updateEvent(eventId, newData);
    }

}