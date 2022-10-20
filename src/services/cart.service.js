import CartDao from "../daos/cart.dao.js";

const getCart = async (id) => {
  if (typeof id !== "string") throw "ID must be a string!";

  const cart = await CartDao.getById(id);
  return cart;
};

const createCart = async () => {
  const newCart = await CartDao.createCart();
  return newCart;
};

const emptyCart = async (id) => {
  if (typeof id !== "string") throw "ID must be a string!";

  await CartDao.emptyCart(id);
};

const deleteCart = async (id) => {
  if (typeof id !== "string") throw "ID must be a string!";

  await CartDao.deleteCart(id);
};

const cartProducts = async (id) => {
  if (typeof id !== "string") throw "ID must be a string!";

  const productsInCart = await CartDao.getCartProducts(id);
  return productsInCart;
};

const insertProductOnCart = async (id, prod) => {
  if (typeof id !== "string") throw "ID must be a string!";

  await CartDao.saveProductOnCart(id, prod);
};

const deleteProductOfCart = async (id, prodId) => {
  if (typeof id !== "string") throw "ID must be a string!";
  if (typeof prodId !== "string") throw "Product ID must be a string!";

  await CartDao.deleteProductOfCart(id, prodId);
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
