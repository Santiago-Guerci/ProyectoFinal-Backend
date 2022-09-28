import { ProductDao } from "../daos/index.js";

//Modificado para que en vez de enviar un json, rendericen el ejs con los productos y así mostrarlos
const getProductOrAll = async (req, res) => {
  let id = req.params.id;
  if (id) {
    try {
      let product = await ProductDao.getById(id);
      res.render("singleProduct.ejs", { product });
    } catch {
      res.json({ error: "Producto no encontrado" });
    }
  } else {
    try {
      let products = await ProductDao.getAll();
      res.render("index.ejs", { products });
    } catch {
      res.json({ error: "Id no encontrado" });
    }
  }
};

const postProduct = (req, res) => {
  try {
    let { name, description, code, thumbnail, price, stock } = req.body;
    let newProduct = { name, description, code, thumbnail, price, stock };
    ProductDao.save(newProduct);
    res.redirect("/");
  } catch (error) {
    res.json({ error: "Error en petición POST. Error: " + error });
  }
};

const putProduct = async (req, res) => {
  let id = req.params.id;
  try {
    let { name, description, code, thumbnail, price, stock } = req.body;
    let newProd = { name, description, code, thumbnail, price, stock };
    res.json(await ProductDao.updateProduct(id, newProd));
  } catch (err) {
    res.json({ error: "Producto no encontrado. Codigo " + err });
  }
};

const deleteProduct = async (req, res) => {
  let id = req.params.id;
  try {
    res.json(await ProductDao.deleteById(id));
  } catch {
    res.json({ error: "Producto no encontrado" });
  }
};

export { getProductOrAll, postProduct, putProduct, deleteProduct };
