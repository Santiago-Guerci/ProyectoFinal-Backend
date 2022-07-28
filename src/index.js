import express from "express";
import productsRoutes from "./routes/productos.js";
import cartsRoutes from "./routes/carritos.js";
const app = express();
const puerto = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", productsRoutes);
app.use("/api/carrito", cartsRoutes);
app.use("/", express.static("public"));

app.use(function (req, res, next) {
  res.status(404);
  res.json({
    Error: -2,
    descripcion: `Ruta ${req.url}, Metodo ${req.method} - No implementada}`,
  });
  next();
});

app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
});
