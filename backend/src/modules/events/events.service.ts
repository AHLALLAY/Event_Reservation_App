import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "./entity/events.entity";
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
}