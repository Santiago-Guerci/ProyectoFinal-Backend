import { productService } from "../services/product.service.js";
import logger from "../config/logger.config.js";

//Modificado para que en vez de enviar un json, rendericen el ejs con los productos y así mostrarlos
const getProductOrAll = async (req, res) => {
  let id = req.params.id;
  if (id) {
    try {
      let product = await productService.getOneProduct(id);
      res.render("singleProduct.ejs", { product });
    } catch (error) {
      logger.error("Producto no encontrado. Error: " + error);
      res.json({ error: "Producto no encontrado" });
    }
  } else {
    try {
      let products = await productService.getAllProducts();
      res.render("products.ejs", { products });
    } catch (error) {
      logger.error("ID no encontrado. Error: " + error);
      res.json({ error: "Id no encontrado" });
    }
  }
};

const postProduct = (req, res) => {
  try {
    let { name, description, code, thumbnail, price, stock } = req.body;
    let newProduct = { name, description, code, thumbnail, price, stock };
    productService.createProduct(newProduct);
    res.redirect("/");
  } catch (error) {
    logger.error("Error en petición POST. Error: " + error);
    res.json({ error: "Error en petición POST. Error: " + error });
  }
};

const putProduct = async (req, res) => {
  let id = req.params.id;
  try {
    let { name, description, code, thumbnail, price, stock } = req.body;
    let newProd = { name, description, code, thumbnail, price, stock };
    res.json(await productService.updateProduct(id, newProd));
  } catch (error) {
    logger.error("Producto no encontrado. Error: " + error);
    res.json({ error: "Producto no encontrado. Codigo " + error });
  }
};

const deleteProduct = async (req, res) => {
  let id = req.params.id;
  try {
    res.json(await productService.deleteProduct(id));
  } catch (error) {
    logger.error("Producto no encontrado. Error: " + error);
    res.json({ error: "Producto no encontrado" });
  }
};

export { getProductOrAll, postProduct, putProduct, deleteProduct };
