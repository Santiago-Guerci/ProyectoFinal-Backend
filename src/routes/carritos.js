import express from "express";
const { Router } = express;
let router = new Router();
import {
  postCart,
  deleteCartById,
  getProductsOnCartById,
  postProductsOnCartById,
  deleteProductOfCartById,
} from "../controllers/cartsControllers.js";

router.post("/", postCart);
router.delete("/:id", deleteCartById);
router.get("/:id/productos", getProductsOnCartById);
router.post("/:id/productos", postProductsOnCartById);
router.delete("/:id/productos/:id_prod", deleteProductOfCartById);

export default router;
