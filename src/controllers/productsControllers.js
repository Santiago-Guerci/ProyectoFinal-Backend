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
