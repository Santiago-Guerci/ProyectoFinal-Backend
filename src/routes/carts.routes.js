import express from "express";
const { Router } = express;
let router = new Router();
import {
  postCart,
  deleteCartById,
  getProductsOnCartById,
  postProductsOnCartById,
  deleteProductOfCartById,
  getProductsOnCartByUserId,
  getSuccessBuy,
} from "../controllers/cartsControllers.js";
import { authCheck } from "../middlewares/loginMW.js";

router.get("/", authCheck, getProductsOnCartByUserId);
router.post("/:id/productos", authCheck, postProductsOnCartById);
router.post("/:id/productos/:id_prod", authCheck, deleteProductOfCartById);
router.get("/:id/success", authCheck, getSuccessBuy);
// router.post("/", postCart);
// router.delete("/:id", authCheck, deleteCartById);
// router.get("/:id/productos", getProductsOnCartById);
// router.delete("/:id/productos/:id_prod", authCheck, deleteProductOfCartById);

export default router;
