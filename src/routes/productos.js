import { Router } from "express";
import {
  getProductOrAll,
  postProduct,
  putProduct,
  deleteProduct,
} from "../controllers/productsControllers.js";

const router = Router();

// Rutas
router.get("/:id?", getProductOrAll);
router.post("/", postProduct);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

export default router;
