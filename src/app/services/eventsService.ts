import { inject, injectable } from "inversify";
import symbols from "../../domain/types/symbols";
import { TaskRepositoryContract, EventRepositoryContract } from '../../domain/contracts/repositoryContract';
import { Identity } from "../../domain/models/base/baseModel";
import { TaskDto, TaskMapper } from "../../domain/models/taskModel";
import { EventDto, EventMapper } from "../../domain/models/eventsModel";
import { LoggerContract } from "../../domain/contracts/utils/loggerContract";
import { BaseCrudServiceContract } from "./baseService";
import { PaginationQuery, PaginationResultModel } from "../../domain/models/base/paginationModel";

export interface TaskServiceContract extends BaseCrudServiceContract<TaskDto> {}
export interface EventServiceContract extends BaseCrudServiceContract<EventDto> {}

@injectable()
export class TaskService implements TaskServiceContract {
    constructor(
        @inject(symbols.Logger) private readonly logger: LoggerContract,
        @inject(symbols.TaskRepository) private readonly taskRepository: TaskRepositoryContract,
        private readonly taskMapper = new TaskMapper()
    ) {
        this.logger.debug('TaskService:constructor');
    }

    async create(entity: Partial<TaskDto>): Promise<TaskDto> {
        const result = await this.taskRepository.create(entity);
        return result;
    }

    async delete(id: Identity): Promise<TaskDto> {
        const result = await this.taskRepository.delete(id);
        return result;
    }

    async find(id: Identity): Promise<TaskDto> {
        const result = await this.taskRepository.find(id);
        return result;
    }

    async list(): Promise<TaskDto[]> {
        const tasks = await this.taskRepository.list();
        return tasks.map((task) => this.taskMapper.mapToDto(task));
    }

    async listPaginated(pagination: PaginationQuery): Promise<PaginationResultModel<TaskDto[]>> {
        if (pagination.page && pagination.page < 1) pagination.page = 1;
        if (pagination.limit && pagination.limit < 1) pagination.limit = 10;

        const paginationResultModel = await this.taskRepository.paginate(pagination);
        const dtoData = paginationResultModel.data.map((item) => this.taskMapper.mapToDto(item));
        const paginationInfo = paginationResultModel.mapToPaginationBase();

        return new PaginationResultModel<TaskDto[]>(dtoData, paginationInfo.meta, paginationInfo.links);
    }

    async update(id: Identity, entity: Partial<TaskDto>): Promise<TaskDto> {
        const result = await this.taskRepository.update(id, entity);
        return result;
    }
}

@injectable()
export class EventService implements EventServiceContract {
    constructor(
        @inject(symbols.Logger) private readonly logger: LoggerContract,
        @inject(symbols.EventRepository) private readonly eventRepository: EventRepositoryContract,
        private readonly eventMapper = new EventMapper()
    ) {
        this.logger.debug('EventService:constructor');
    }

    async create(entity: Partial<EventDto>): Promise<EventDto> {
        const result = await this.eventRepository.create(entity);
        return result;
    }

    async delete(id: Identity): Promise<EventDto> {
        const result = await this.eventRepository.delete(id);
        return result;
    }

    async find(id: Identity): Promise<EventDto> {
        const result = await this.eventRepository.find(id);
        return result;
    }

    async list(): Promise<EventDto[]> {
        const events = await this.eventRepository.list();
        return events.map((event) => this.eventMapper.mapToDto(event));
    }

    async listPaginated(pagination: PaginationQuery): Promise<PaginationResultModel<EventDto[]>> {
        if (pagination.page && pagination.page < 1) pagination.page = 1;
        if (pagination.limit && pagination.limit < 1) pagination.limit = 10;

        const paginationResultModel = await this.eventRepository.paginate(pagination);
        const dtoData = paginationResultModel.data.map((item) => this.eventMapper.mapToDto(item));
        const paginationInfo = paginationResultModel.mapToPaginationBase();

        return new PaginationResultModel<EventDto[]>(dtoData, paginationInfo.meta, paginationInfo.links);
    }

    async update(id: Identity, entity: Partial<EventDto>): Promise<EventDto> {
        const result = await this.eventRepository.update(id, entity);
        return result;
    }
}
