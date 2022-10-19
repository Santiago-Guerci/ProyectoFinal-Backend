import { Router } from "express";
import { getProductOrAll, postProduct, putProduct, deleteProduct } from "../controllers/products.controller.js";
import { authCheck } from "../middlewares/loginMW.js";

const router = Router();

// Rutas
router.get("/:id?", authCheck, getProductOrAll);
router.post("/", authCheck, postProduct);
router.put("/:id", authCheck, putProduct);
router.delete("/:id", authCheck, deleteProduct);

export default router;
