import express from "express";
const { Router } = express;
let router = new Router();
import { postProductsOnCartById, deleteProductOfCartById, getProductsOnCartByUserId, getSuccessBuy } from "../controllers/carts.controller.js";
import { authCheck } from "../middlewares/login.mw.js";

router.get("/", authCheck, getProductsOnCartByUserId);
router.post("/:id/productos", authCheck, postProductsOnCartById);
router.post("/:id/productos/:id_prod", authCheck, deleteProductOfCartById);
router.get("/:id/success", authCheck, getSuccessBuy);

export default router;
