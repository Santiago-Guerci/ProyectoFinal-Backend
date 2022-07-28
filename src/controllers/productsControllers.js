import { ProductDao } from "../daos/index.js";

const getProductOrAll = async (req, res) => {
  let id = req.params.id;
  if (id) {
    try {
      res.json(await ProductDao.getById(id));
    } catch {
      res.json({ error: "Producto no encontrado" });
    }
  } else {
    try {
      res.json(await ProductDao.getAll());
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
  } catch {
    res.json({ error: "Error en petición POST" });
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

const deleteProduct = (req, res) => {
  let id = req.params.id;
  try {
    res.json(ProductDao.deleteById(id));
  } catch {
    res.json({ error: "Producto no encontrado" });
  }
};

module.exports = {
  productos,
  getProductOrAll,
  postProduct,
  putProduct,
  deleteProduct,
};
