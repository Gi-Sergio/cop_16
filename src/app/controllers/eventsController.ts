import { inject, injectable } from 'inversify';
import symbols from '../../domain/types/symbols';
import { EventServiceContract } from '../services/eventsService';
import { BaseController, CrudControllerContract } from './baseController';
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import {
    Get,
    SuccessResponse,
    Request,
    Response,
    Route,
    Produces,
    Tags,
    Delete,
    Put,
    Body,
    Post
} from 'tsoa';
import { DefaultErrorResponse, DefaultResponse } from '../../infrastructure/utils/webApiResponses';
import { PaginationQueryBuilderContract } from '../../domain/contracts/utils/paginationContract';
import { PaginationResultModel } from '../../domain/models/base/paginationModel';
import { EventDto, EventRequestDto } from '../../domain/models/eventsModel';
import { Path } from '@tsoa/runtime/dist/decorators/parameter';
import { Identity } from '../../domain/models/base/baseModel';

export interface EventControllerContract extends CrudControllerContract {}

@Route('/api/v1/events')
@Produces('application/json')
@Tags('Events')
@injectable()
export class EventController extends BaseController implements EventControllerContract {
    constructor(
        @inject(symbols.PaginationQueryBuilder) private readonly paginationQueryBuilder: PaginationQueryBuilderContract,
        @inject(symbols.EventService) private readonly eventService: EventServiceContract
    ) {
        super();
    }

    async create(req: ExpressRequest, res: ExpressResponse, _next: NextFunction): Promise<void> {
        const dto = await this.createNew(req.body);
        this.CreatedObject(res, dto);
    }

    async delete(req: ExpressRequest, res: ExpressResponse, _next: NextFunction): Promise<void> {
        const id = req.params.id;
        const dto = await this.deleteOne(id);
        this.OkObject(res, dto);
    }

    async find(req: ExpressRequest, res: ExpressResponse, _next: NextFunction): Promise<void> {
        const id = req.params.id;
        const dto = await this.findOne(id);
        this.OkObject(res, dto);
    }

    async list(req: ExpressRequest, res: ExpressResponse, _next: NextFunction): Promise<void> {
        const dto = await this.listPaginated(req);
        this.OkObject(res, dto);
    }

    async update(req: ExpressRequest, res: ExpressResponse, _next: NextFunction): Promise<void> {
        const id = req.params.id;
        const dto = await this.updateOne(id, req.body);
        this.OkObject(res, dto);
    }

    @Get('/')
    @SuccessResponse('200', 'OK')
    @Response<DefaultErrorResponse>('400', 'BAD REQUEST')
    @Response<DefaultResponse>('404', 'NOT FOUND')
    private async listPaginated(@Request() request: ExpressRequest): Promise<PaginationResultModel<EventDto[]>> {
        const query = this.paginationQueryBuilder.build(request);
        return await this.eventService.listPaginated(query);
    }

    @Get('/{id}')
    @SuccessResponse('200', 'OK')
    @Response<DefaultErrorResponse>('400', 'BAD REQUEST')
    @Response<DefaultResponse>('404', 'NOT FOUND')
    @Produces('application/json')
    private async findOne(@Path() id: Identity): Promise<EventDto> {
        return await this.eventService.find(id);
    }

    @Post('/')
    @SuccessResponse('201', 'CREATED')
    @Response<DefaultErrorResponse>('400', 'BAD REQUEST')
    @Response<DefaultResponse>('404', 'NOT FOUND')
    @Produces('application/json')
    private async createNew(@Body() data: EventRequestDto): Promise<EventDto> {
        return await this.eventService.create(data);
    }

    @Put('/{id}')
    @SuccessResponse('200', 'OK')
    @Response<DefaultErrorResponse>('400', 'BAD REQUEST')
    @Response<DefaultResponse>('404', 'NOT FOUND')
    @Produces('application/json')
    private async updateOne(@Path() id: Identity, @Body() data: EventRequestDto): Promise<EventDto> {
        return await this.eventService.update(id, data);
    }

    @Delete('/{id}')
    @SuccessResponse('200', 'OK')
    @Response<DefaultErrorResponse>('400', 'BAD REQUEST')
    @Response<DefaultResponse>('404', 'NOT FOUND')
    @Produces('application/json')
    private async deleteOne(@Path() id: Identity): Promise<EventDto> {
        return await this.eventService.delete(id);
    }
}
