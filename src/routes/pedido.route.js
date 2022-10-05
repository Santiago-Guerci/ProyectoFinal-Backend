import express from "express";
const { Router } = express;
let router = new Router();
import { authCheck } from "../middlewares/loginMW.js";
import { getPedido, confirmPedido } from "../controllers/pedido.controller.js";

router.get("/", authCheck, getPedido);
router.get("/ok", authCheck, confirmPedido);

export default router;
