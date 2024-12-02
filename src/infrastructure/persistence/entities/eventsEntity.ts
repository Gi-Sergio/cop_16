import 'reflect-metadata';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from 'typeorm';
import { EventModel } from '../../../domain/models/eventsModel';
import { Identity } from '../../../domain/models/base/baseModel';

@Entity('events')
export class EventEntity implements EventModel {
    @PrimaryGeneratedColumn()
    readonly id!: Identity;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    location!: string;

    @Column()
    startDate!: Date;

    @Column()
    endDate!: Date;

    @Column('boolean')
    isPublic!: boolean;

    @Column({name: 'task_id'})
    taskId!: number;

    @CreateDateColumn()
    readonly createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date | null;
}
