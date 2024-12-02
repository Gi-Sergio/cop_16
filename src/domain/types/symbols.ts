const symbols = {
  PaginationQueryBuilder: Symbol.for('PaginationQueryBuilder'),
  PdfGenerator: Symbol.for('PdfGenerator'),
  HandlebarsCompiler: Symbol.for('HandlebarsCompiler'),
  HandlebarsLoader: Symbol.for('HandlebarsLoader'),
  Logger: Symbol.for('Logger'),

  // Task-related symbols
  TaskRepository: Symbol.for('TaskRepository'),
  TaskService: Symbol.for('TaskService'),
  TaskController: Symbol.for('TaskController'),

  // Event-related symbols
  EventRepository: Symbol.for('EventRepository'),
  EventService: Symbol.for('EventService'),
  EventController: Symbol.for('EventController'),
};

export default symbols;
