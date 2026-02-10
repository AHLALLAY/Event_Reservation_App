import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Event } from '../../events/entity/events.entity';
import { User } from '../../users/entities/user.entity';

export enum ReservationStatus {
    pending = 'pending',
    confirmed = 'confirmed',
    refused = 'refused',
    canceled = 'canceled',
}

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: ReservationStatus, default: ReservationStatus.pending })
    status: ReservationStatus;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Event, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'eventId' })
    event: Event;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
