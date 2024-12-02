import { EventEntity } from "../../infrastructure/persistence/entities/eventsEntity";
import { BaseModel, MapperBase } from "./base/baseModel";

export interface EventModel extends BaseModel {
    name: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
    isPublic: boolean;
    taskId: number;
}

export interface EventDto extends Partial<Omit<EventModel, 'deletedAt'>> {}

export interface EventRequestDto extends Partial<Omit<EventDto, 'id' | 'createdAt' | 'updatedAt'>> {}

export class EventMapper implements MapperBase<EventModel, EventDto> {
    mapToDto(entity: EventModel): EventDto {
        const { deletedAt, ...omitted } = entity as EventModel;
        return omitted as EventDto;
    }

    public mapToEntity(dto: EventRequestDto): EventEntity {
        const entity = new EventEntity();
        entity.name = dto.name || '';
        entity.description = dto.description || '';
        entity.location = dto.location || '';
        entity.startDate = new Date(dto.startDate || new Date());
        entity.endDate = new Date(dto.endDate || new Date());
        entity.isPublic = dto.isPublic || false;
        entity.taskId = dto.taskId || 0;
        return entity;
    }
}
