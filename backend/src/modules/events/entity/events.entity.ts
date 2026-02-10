import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum EventStatus {
    draft = 'draft',
    published = 'published',
    canceled = 'canceled',
    ended = 'ended',
}

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 20 })
    title: string;

    @Column({ type: 'text', nullable: true})
    description: string;

    @Column({ type: 'timestamptz' })
    startDate: Date;

    @Column({ type: 'timestamptz' })
    endDate: Date;

    @Column({ length: 100 })
    place: string;

    @Column({ type: 'int', default: 1 })
    capacity: number;

    @Column({ type: 'enum', enum: EventStatus, default: EventStatus.draft })
    status: EventStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}