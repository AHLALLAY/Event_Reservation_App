import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { AuthGuard } from '../auths/guards/auth.guard';

@Controller('reservations')
export class ReservationsController {
    constructor(private reservationsService: ReservationsService) {}

    @Post()
    @UseGuards(AuthGuard)
    createReservation(@Req() req: { user: { id: string } }, @Body() reservationData: CreateReservationDto) {
        return this.reservationsService.createReservation(req.user.id, reservationData);
    }

    @Get()
    getReservations() {
        return this.reservationsService.getReservations();
    }

    @Get('me')
    @UseGuards(AuthGuard)
    getMyReservations(@Req() req: { user: { id: string } }) {
        return this.reservationsService.getMyReservations(req.user.id);
    }
}