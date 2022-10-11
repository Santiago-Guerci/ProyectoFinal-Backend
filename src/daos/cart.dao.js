import { Cart } from "../models/cart.model.js";

//METODOS DE CARRITOS
const getCartById = async (id) => {
  try {
    const doc = await Cart.findOne({ _id: id }, { __v: 0 });
    return doc;
  } catch (error) {
    logger.error("Error reading getById. Error: " + error);
    next();
  }
};

const createCart = async () => {
  try {
    let timestamp = Date.now();
    let products = [];
    const cartModel = new Cart({ timestamp, products });
    const newCart = await cartModel.save();
    console.log(`Cart id: ${newCart._id} has been created`);
    return newCart._id;
  } catch (error) {
    logger.error("There has been an error creating the cart. Error: " + error);
  }
};

const emptyCart = async (id) => {
  try {
    await Cart.updateOne({ _id: id }, { $set: { products: [] } });
    console.log(`The cart ${id} has been emptied`);
  } catch (error) {
    logger.error(`Error emtpying cart ${id}. Error: ${error}`);
  }
};

const deleteCart = async (id) => {
  try {
    await Cart.deleteOne({ _id: id });
    console.log(`The cart ${id} has been deleted`);
  } catch (error) {
    logger.error(`Error deleting cart ${id}. Error: ${error}`);
  }
};

const getProductsById = async (id) => {
  try {
    let cart = await getCartById(id);
    return cart.products;
  } catch (error) {
    logger.error(`Error getting products from cart ${id}. Error: ${error}`);
  }
};

//De los productos que ya tengo, cada prod tiene un id. Lo agarro, y lo meto en el cart solicitado (lo agarro por req.body)
const postProductOnCart = async (id, myProd) => {
  try {
    let cart = await getCartById(id);
    cart.products.push(myProd);
    let cartModel = new Cart(cart);
    await cartModel.save();
    console.log(`The product ${myProd.name} has been added to cart ${id}`);
    return cart.products;
  } catch (error) {
    logger.error(`Error pushing product in cart. Error: ${error}`);
  }
};

const deleteProductOfCart = async (id, prodId) => {
  try {
    let cart = await getCartById(id);
    let cartProds = await getProductsById(id);
    let index = cartProds.indexOf(prodId);
    cart.products.splice(index, 1);

    let cartModel = new Cart(cart);
    await cartModel.save();
    console.log(`The product ${prodId} has been deleted from cart ${id}`);
  } catch (error) {
    logger.error(`Error deleting product from cart. Error: ${error}`);
  }
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
