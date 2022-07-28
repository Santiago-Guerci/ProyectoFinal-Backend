import { CartDao, ProductDao } from "../daos/index.js";

const postCart = async (req, res) => {
  res.json(await CartDao.createCart());
};

const deleteCartById = async (req, res) => {
  let id = req.params.id;
  await CartDao.emptyCart(id);
  res.json(await carritos.deleteCart(id));
};

const getProductsOnCartById = async (req, res) => {
  let id = req.params.id;
  res.json(await CartDao.getProductsById(id));
};

const postProductsOnCartById = async (req, res) => {
  let id = req.params.id;
  let prodId = req.body.id;
  let myProd = await ProductDao.getById(prodId);
  res.json(CartDao.postProductOnCart(id, myProd));
};

const deleteProductOfCartById = (req, res) => {
  let id = req.params.id;
  let prodId = req.params.id_prod;
  res.json(CartDao.deleteProductOfCart(id, prodId));
};

module.exports = {
  postCart,
  deleteCartById,
  getProductsOnCartById,
  postProductsOnCartById,
  deleteProductOfCartById,
};
