import express from "express";
const { Router } = express;
let router = new Router();
import {
  getProductOrAll,
  postProduct,
  putProduct,
  deleteProduct,
} from "../controllers/productsControllers.js";
// const admin = true;

// const verifyLogin = (admin) => {
//   return (req, res, next) => {
//     if (admin === true) {
//       next;
//     } else {
//       res.json({
//         Error: -1,
//         descripcion: `Ruta ${req.route.path}, Metodo ${req.route.stack[0].method} - No autorizada}`,
//       });
//     }
//   };
// };

// Rutas
router.get("/:id?", getProductOrAll);
router.post("/", postProduct);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

export default router;
