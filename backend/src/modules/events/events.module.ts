import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./entity/events.entity";
import { EventController } from "./events.controller";
import { EventService } from "./events.service";

@Module({
    imports: [TypeOrmModule.forFeature([Event])],
    controllers: [EventController],
    providers: [EventService],
    exports: [EventService],
})

export class EventModule { }