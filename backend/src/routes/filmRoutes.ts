import { Router } from "express";
import {
  getFilms,
  getCategory,
  runCustomQuery,
} from "../controllers/filmController";

const router = Router();

router.get("/", getFilms);

router.get("/category", getCategory);
router.post("/custom-query", runCustomQuery);

export default router;
