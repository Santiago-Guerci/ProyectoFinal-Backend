import { CartDao, ProductDao } from "../daos/index.js";

const postCart = async (req, res) => {
  res.json(await CartDao.createCart());
};

const deleteCartById = async (req, res) => {
  let id = req.params.id;
  await CartDao.emptyCart(id);
  res.json(await CartDao.deleteCart(id));
};

const getProductsOnCartById = async (req, res) => {
  let id = req.params.id;
  res.json(await CartDao.getProductsById(id));
};

//Actualmente estoy agarrando un producto del body en vez de traerlo desde la base de datos de productos.
//CORREGIR
const postProductsOnCartById = async (req, res) => {
  let id = req.params.id;
  let prodId = req.body;
  res.json(CartDao.postProductOnCart(id, prodId));
};

const deleteProductOfCartById = (req, res) => {
  let id = req.params.id;
  let prodId = req.params.id_prod;
  res.json(CartDao.deleteProductOfCart(id, prodId));
};

export {
  postCart,
  deleteCartById,
  getProductsOnCartById,
  postProductsOnCartById,
  deleteProductOfCartById,
};
