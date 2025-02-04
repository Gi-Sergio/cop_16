"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const config_1 = __importDefault(require("./config/config"));
const databaseConfig_1 = __importDefault(require("./infrastructure/persistence/databaseConfig"));
const server_1 = __importDefault(require("./bootstrap/server"));
const serviceCollection_1 = __importDefault(require("./bootstrap/ioc/serviceCollection"));
const logger = serviceCollection_1.default.getLogger();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield databaseConfig_1.default.initialize();
            logger.info('Database connected successfully!');
            yield new server_1.default(config_1.default.app).start();
        }
        catch (err) {
            logger.error(err);
        }
    });
}
main();
