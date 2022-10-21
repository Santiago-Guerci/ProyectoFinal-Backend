import { Router } from "express";
import loginRouter from "./login.routes.js";
import productRouter from "./products.routes.js";
import cartRouter from "./carts.routes.js";
import logger from "../config/logger.config.js";

const router = Router();

router.use("/", loginRouter);
router.use("/api/productos", productRouter);
router.use("/api/carrito", cartRouter);
router.get("*", (req, res) => {
  logger.error("Ruta no establecida");
  res.render("error-route.ejs");
});

export default router;
