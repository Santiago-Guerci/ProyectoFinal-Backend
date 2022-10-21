import { cartDao } from "../daos/cart.dao.js";

const getCart = async (id) => {
  if (typeof id !== "string") throw "ID must be a string!";

  const cart = await cartDao.getById(id);
  return cart;
};

const createCart = async () => {
  const newCart = await cartDao.createCart();
  return newCart;
};

const emptyCart = async (id) => {
  if (typeof id !== "string") throw "ID must be a string!";

  await cartDao.emptyCart(id);
};

const deleteCart = async (id) => {
  if (typeof id !== "string") throw "ID must be a string!";

  await cartDao.deleteCart(id);
};

const cartProducts = async (id) => {
  if (typeof id !== "string") throw "ID must be a string!";

  const productsInCart = await cartDao.getCartProducts(id);
  return productsInCart;
};

const insertProductOnCart = async (id, prod) => {
  if (typeof id !== "string") throw "ID must be a string!";

  await cartDao.saveProductOnCart(id, prod);
};

const deleteProductOfCart = async (id, prodId) => {
  if (typeof id !== "string") throw "ID must be a string!";
  if (typeof prodId !== "string") throw "Product ID must be a string!";

  await cartDao.deleteProductOfCart(id, prodId);
};

export const cartService = {
  getCart,
  createCart,
  emptyCart,
  deleteCart,
  cartProducts,
  insertProductOnCart,
  deleteProductOfCart,
};
