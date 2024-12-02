import 'reflect-metadata';
import { Container } from 'inversify';

import symbols from '../../domain/types/symbols';
import { CrudControllerContract } from '../../app/controllers/baseController';
import { PaginationQueryBuilder } from '../../infrastructure/utils/pagination/paginationQueryBuilder';
import { PaginationQueryBuilderContract } from '../../domain/contracts/utils/paginationContract';
//import { PdfGeneratorContract } from '../../domain/contracts/utils/pdfGeneratorContract';
//import { PdfGenerator } from '../../infrastructure/utils/pdf/pdfGenerator';
import { HandlebarsCompilerContract } from '../../domain/contracts/utils/handlebarsCompilerContract';
import { HandlebarsCompiler } from '../../infrastructure/utils/handlebars/handlebarsCompiler';
import { HandlebarsLoader } from '../../infrastructure/utils/handlebars/handlebarsLoader';
import { HandlebarsLoaderContract } from '../../domain/contracts/utils/handlebarsLoaderContract';
import { LoggerContract } from '../../domain/contracts/utils/loggerContract';
import { Logger } from '../../infrastructure/utils/logger/logger';

// Task imports
import { TaskRepositoryContract } from '../../domain/contracts/repositoryContract';
import { TaskRepository } from '../../infrastructure/persistence/repositories/taskRepository';
import { TaskService, TaskServiceContract } from '../../app/services/taskService';
import { TaskController } from '../../app/controllers/taskController';

// Event imports
import { EventRepositoryContract } from '../../domain/contracts/repositoryContract';
import { EventRepository } from '../../infrastructure/persistence/repositories/eventsRepository';
import { EventService, EventServiceContract } from '../../app/services/eventsService';
import { EventController } from '../../app/controllers/eventsController';

const container = new Container();

// Task bindings
container.bind<TaskRepositoryContract>(symbols.TaskRepository).to(TaskRepository).inSingletonScope();
container.bind<TaskServiceContract>(symbols.TaskService).to(TaskService).inSingletonScope();
container.bind<CrudControllerContract>(symbols.TaskController).to(TaskController).inSingletonScope();

// Event bindings
container.bind<EventRepositoryContract>(symbols.EventRepository).to(EventRepository).inSingletonScope();
container.bind<EventServiceContract>(symbols.EventService).to(EventService).inSingletonScope();
container.bind<CrudControllerContract>(symbols.EventController).to(EventController).inSingletonScope();

// Utility bindings
container.bind<PaginationQueryBuilderContract>(symbols.PaginationQueryBuilder).to(PaginationQueryBuilder).inSingletonScope();
//container.bind<PdfGeneratorContract>(symbols.PdfGenerator).to(PdfGenerator).inSingletonScope();
container.bind<HandlebarsCompilerContract>(symbols.HandlebarsCompiler).to(HandlebarsCompiler).inSingletonScope();
container.bind<HandlebarsLoaderContract>(symbols.HandlebarsLoader).to(HandlebarsLoader).inSingletonScope();
container.bind<LoggerContract>(symbols.Logger).to(Logger).inSingletonScope();

export default container;
