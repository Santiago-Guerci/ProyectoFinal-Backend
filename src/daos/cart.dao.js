import { Cart } from "../models/cart.model.js";
import BaseRepository from "./baseRepository.js";

let instance;

class CartDao extends BaseRepository {
  constructor() {
    super(Cart);
  }

  async createCart() {
    let products = [];
    let cart = await this.create(new Cart({ products }));
    return cart;
  }

  async emptyCart(id) {
    await Cart.updateOne({ _id: id }, { $set: { products: [] } });
  }

  async getCartProducts(id) {
    let cart = await this.getById(id);
    return cart.products;
  }

  async saveProductOnCart(id, product) {
    let cart = await this.getById(id);
    cart.products.push(product);
    await this.create(new Cart(cart));
  }

  async deleteProductOfCart(id, productId) {
    let cart = await this.getById(id);
    let cartProducts = await this.getCartProducts(id);
    let index = cartProducts.indexOf(productId);
    cart.products.splice(index, 1);

    await this.create(new Cart(cart));
  }

  static getInstance() {
    if (!instance) {
      instance = new CartDao();
    }
    return instance;
  }
}

// const deleteProductOfCart = async (id, prodId) => {
//   let cart = await getCartById(id);
//   let cartProds = await getProductsById(id);
//   let index = cartProds.indexOf(prodId);
//   cart.products.splice(index, 1);

//   let cartModel = new Cart(cart);
//   await cartModel.save();
// };

// const postProductOnCart = async (id, myProd) => {
//   let cart = await getCartById(id);
//   cart.products.push(myProd);
//   let cartModel = new Cart(cart);
//   await cartModel.save();
// };

// const createCart = async () => {
//   let products = [];
//   const cartModel = new Cart({ products });
//   const newCart = await cartModel.save();
//   return newCart;
// };

// const emptyCart = async (id) => {
//   await Cart.updateOne({ _id: id }, { $set: { products: [] } });
//   console.log(`The cart ${id} has been emptied`);
// };

// const deleteCart = async (id) => {
//   await Cart.deleteOne({ _id: id });
// };

// const getProductsById = async (id) => {
//   let cart = await getCartById(id);
//   return cart.products;
// };

export const cartDao = new CartDao();
