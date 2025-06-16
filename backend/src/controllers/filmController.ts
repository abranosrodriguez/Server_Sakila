import { Request, Response } from "express";
import { getDbPool } from "../database/db";
import mysql from "mysql2/promise";
import { dbConfig } from "../config";

export const getFilms = async (_req: Request, res: Response) => {
  try {
    //Llamamos a getDbPool para comprobar conexion
    const db = getDbPool();
    const [rows] = await db.query(
      "select film_id as 'Película', title as 'Título', description as 'Descripción',release_year as 'Año de Lanzamiento',rental_duration as 'Tiempo de alquiler', rental_rate as 'Porcentaje de Alquiler',length as 'Duración',replacement_cost as 'Coste de Sustitución', rating as 'Valoración',special_features as 'Características Especiales' from film;"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener films:", error);
    res.status(500).json({ message: "Error al obtener films", error });
  }
};

export const getCategory = async (_req: Request, res: Response) => {
  //Llamamos a getDbPool para comprobar conexion
  const db = getDbPool();
  try {
    //db = createDbPool(host, username, password, database);
    const [rows] = await db.query(
      `SELECT 
         c.name AS categoria, 
         ROUND(AVG(f.length), 2) AS duracion_media 
       FROM film f 
       JOIN film_category fc ON f.film_id = fc.film_id 
       JOIN category c ON fc.category_id = c.category_id 
       GROUP BY c.name;`
    );
    res.json(rows);
  } catch (error) {
    console.error("❌ Error en /api/category:", error);
    res.status(500).json({
      message: "Error al consultar la base de datos",
      //error: error.message,
    });
  }
};

// Esta función recibe una query personalizada y la ejecuta
export const runCustomQuery = async (req: Request, res: Response) => {
  const { query } = req.body;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ message: "Query no válida." });
  }

  try {
    const conn = await mysql.createConnection(dbConfig);
    const [results] = await conn.query(query);
    await conn.end();

    res.status(200).json(results);
  } catch (error: any) {
    console.error("Error al ejecutar query personalizada:", error.message);
    res.status(500).json({ message: "Error al ejecutar query." });
  }
};
