"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbPool = getDbPool;
const promise_1 = __importDefault(require("mysql2/promise"));
const config_1 = require("../config"); // Asegúrate que la ruta es la correcta
let pool = null;
function getDbPool() {
    if (!pool) {
        pool = promise_1.default.createPool({
            host: config_1.dbConfig.host,
            user: config_1.dbConfig.user,
            port: config_1.dbConfig.port,
            password: config_1.dbConfig.password,
            database: config_1.dbConfig.database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }
    return pool;
}
//      host: dbConfig.host,
//      database: dbConfig.database,
//      user: dbConfig.user,
//      password: dbConfig.password,
