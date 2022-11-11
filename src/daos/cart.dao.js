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

export const cartDao = new CartDao();
