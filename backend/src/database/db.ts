import mysql, { Pool } from "mysql2/promise";
import { dbConfig } from "../config"; // Asegúrate que la ruta es la correcta

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: dbConfig.host,
      user: dbConfig.user,
      port: dbConfig.port,
      password: dbConfig.password,
      database: dbConfig.database,
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
