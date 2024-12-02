import { Repository } from 'typeorm';
import { injectable } from 'inversify';
import { Query, EventRepositoryContract } from '../../../domain/contracts/repositoryContract';
import { Identity } from '../../../domain/models/base/baseModel';

import { EventModel } from '../../../domain/models/eventsModel';
import DefaultCrudRepository from './DefaultCrudRepository';
import { EventEntity } from '../entities/eventsEntity';
import { PaginationQuery, PaginationResultModel } from '../../../domain/models/base/paginationModel';
import { buildPaginationConfig } from '../../utils/pagination/paginationConfig';
import { paginate } from 'nestjs-paginate';

@injectable()
export class EventRepository implements EventRepositoryContract {
    constructor(
        private readonly defaultCrudRepository: DefaultCrudRepository<EventModel, EventEntity> = new DefaultCrudRepository(EventEntity)
    ) { }

    async create(model: Partial<EventModel>, query: Query | undefined): Promise<EventModel> {
        return await this.defaultCrudRepository.create(model, query);
    }

    async delete(id: Identity, query: Query | undefined): Promise<EventModel> {
        return await this.defaultCrudRepository.delete(id, query);
    }

    async find(id: Identity, query: Query | undefined): Promise<EventModel> {
        return await this.defaultCrudRepository.find(id, query);
    }

    async paginate(pagination: PaginationQuery, _query: Query | undefined): Promise<PaginationResultModel<EventModel[]>> {
        const paginationConfig = buildPaginationConfig<EventEntity>({
            maxLimit: 1000,
            sortableColumns: ['id', 'name', 'location', 'startDate'],
            filterableColumns: {
                id: true,
                name: true,
                location: true,
                startDate: true,
            },
        });

        const result = await paginate(pagination, this.defaultCrudRepository.getRepository() as Repository<EventEntity>, paginationConfig);

        const { data, meta, links } = result;

        return new PaginationResultModel<EventModel[]>(data, meta, links);
    }

    async list(query: Query | undefined): Promise<EventModel[]> {
        return await this.defaultCrudRepository.list(query);
    }

    async update(id: Identity, model: Partial<EventModel>, query: Query | undefined): Promise<EventModel> {
        return await this.defaultCrudRepository.update(id, model, query);
    }
}
