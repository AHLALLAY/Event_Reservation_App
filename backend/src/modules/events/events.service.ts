import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event, EventStatus } from "./entity/events.entity";
import { EventDto } from "./dtos/events.dto";


@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private eventRepo: Repository<Event>
    ) { }

    async createEvent(event: EventDto) {
        const evnt = this.eventRepo.create({
            ...event,
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),
        });
        return this.eventRepo.save(evnt);
    }

    async getEvents(status?: EventStatus) {
        if (status) {
            return await this.eventRepo.find({ where: { status } })
        }
        return await this.eventRepo.find({})
    }

    async getEventById(eventId: string) {
        const event = await this.eventRepo.findOne({ where: { id: eventId } });
        if (!event) throw new NotFoundException('Evenement introuvable');
        return event;
    }


}