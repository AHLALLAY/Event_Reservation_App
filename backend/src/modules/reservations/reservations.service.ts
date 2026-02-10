import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation, ReservationStatus } from './entity/reservation.entity';
import { EventStatus } from '../events/entity/events.entity';
import { EventService } from '../events/events.service';
import { CreateReservationDto } from './dtos/create-reservation.dto';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepo: Repository<Reservation>,
        private eventService: EventService,
    ) {}

    async createReservation(userId: string, reservationData: CreateReservationDto) {
        const event = await this.eventService.getEventById(reservationData.eventId);
        if (event.status !== EventStatus.published) {
            throw new BadRequestException("L'événement n'est pas ouvert aux réservations.");
        }

        const existing = await this.reservationRepo.findOne({
            where: [
                { user: { id: userId }, event: { id: reservationData.eventId }, status: ReservationStatus.pending },
                { user: { id: userId }, event: { id: reservationData.eventId }, status: ReservationStatus.confirmed },
            ],
        });
        if (existing) {
            throw new BadRequestException('Vous avez déjà une réservation pour cet événement.');
        }

        const confirmedCount = await this.reservationRepo.count({
            where: { event: { id: reservationData.eventId }, status: ReservationStatus.confirmed },
        });
        const pendingCount = await this.reservationRepo.count({
            where: { event: { id: reservationData.eventId }, status: ReservationStatus.pending },
        });
        const total = confirmedCount + pendingCount;
        if (total >= event.capacity) {
            throw new BadRequestException("Capacité de l'événement atteinte.");
        }

        const reservation = this.reservationRepo.create({
            status: ReservationStatus.pending,
            user: { id: userId } as any,
            event: event,
        });
        return this.reservationRepo.save(reservation);
    }

    async getReservations() {
        return this.reservationRepo.find({
            relations: ['event', 'user'],
            order: { createdAt: 'DESC' },
        });
    }

    async getMyReservations(userId: string) {
        return this.reservationRepo.find({
            where: { user: { id: userId } },
            relations: ['event', 'user'],
            order: { createdAt: 'DESC' },
        });
    }

    async confirmReservation(reservationId: string) {
        const reservation = await this.reservationRepo.findOne({
            where: { id: reservationId },
            relations: ['event', 'user'],
        });
        if (!reservation) throw new NotFoundException('Réservation introuvable');
        if (reservation.status !== ReservationStatus.pending) {
            throw new BadRequestException('Seule une réservation en attente peut être acceptée.');
        }
        reservation.status = ReservationStatus.confirmed;
        return this.reservationRepo.save(reservation);
    }

    async refuseReservation(reservationId: string) {
        const reservation = await this.reservationRepo.findOne({
            where: { id: reservationId },
            relations: ['event', 'user'],
        });
        if (!reservation) throw new NotFoundException('Réservation introuvable');
        if (reservation.status !== ReservationStatus.pending) {
            throw new BadRequestException('Seule une réservation en attente peut être refusée.');
        }
        reservation.status = ReservationStatus.refused;
        return this.reservationRepo.save(reservation);
    }
}
