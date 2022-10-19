import { Cart } from "../models/cart.model.js";

//METODOS DE CARRITOS
const getCartById = async (id) => {
  const cart = await Cart.findOne({ _id: id }, { __v: 0 });
  return cart;
};

const createCart = async () => {
  let products = [];
  const cartModel = new Cart({ products });
  const newCart = await cartModel.save();
  return newCart;
};

const emptyCart = async (id) => {
  await Cart.updateOne({ _id: id }, { $set: { products: [] } });
  console.log(`The cart ${id} has been emptied`);
};

const deleteCart = async (id) => {
  await Cart.deleteOne({ _id: id });
};

const getProductsById = async (id) => {
  let cart = await getCartById(id);
  return cart.products;
};

//De los productos que ya tengo, cada prod tiene un id. Lo agarro, y lo meto en el cart solicitado (lo agarro por req.body)
const postProductOnCart = async (id, myProd) => {
  let cart = await getCartById(id);
  cart.products.push(myProd);
  let cartModel = new Cart(cart);
  await cartModel.save();
};

const deleteProductOfCart = async (id, prodId) => {
  let cart = await getCartById(id);
  let cartProds = await getProductsById(id);
  let index = cartProds.indexOf(prodId);
  cart.products.splice(index, 1);

  let cartModel = new Cart(cart);
  await cartModel.save();
};
//FIN METODOS DE CARRITOS

export const cartDao = {
  getCartById,
  createCart,
  emptyCart,
  deleteCart,
  getProductsById,
  postProductOnCart,
  deleteProductOfCart,
};
