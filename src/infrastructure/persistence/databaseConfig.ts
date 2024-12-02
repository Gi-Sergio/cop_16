import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import config from '../../config/config';
import { TaskEntity } from './entities/taskEntity';
import { EventEntity } from './entities/eventsEntity'; // Importa EventEntity

const isProduction = process.env.NODE_ENV === 'production'; // Cambié 'development' por 'production'

export default new DataSource({
  type: 'mysql', // Asegúrate de que sea compatible con tu base de datos
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.dbname,
  entities: [
    TaskEntity,
    EventEntity, // Agrega EventEntity a la lista de entidades
  ],
  synchronize: config.db.synchronize, // Activa solo para desarrollo
  logging: config.db.logging, // Configuración de logging
  namingStrategy: new SnakeNamingStrategy(), // Usar estrategia snake_case
  migrations: isProduction
    ? ['dist/src/infrastructure/persistence/migrations/*.js']
    : ['src/infrastructure/persistence/migrations/*.ts'], // Rutas consistentes para migraciones
});
