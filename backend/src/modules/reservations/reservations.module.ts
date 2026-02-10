import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { EventModule } from '../events/events.module';
import { AuthModule } from '../auths/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Reservation]),
        EventModule,
        AuthModule,
    ],
    controllers: [ReservationsController],
    providers: [ReservationsService],
    exports: [ReservationsService],
})
export class ReservationsModule {}
