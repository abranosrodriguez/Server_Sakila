import { Router } from "express";
import { getFilms, getCategory } from "../controllers/filmController";
import { runCustomQuery } from "../controllers/filmController";

const router = Router();

router.get("/", getFilms);

router.get("/category", getCategory);
//router.post("/custom-query", runCustomQuery);

export default router;
