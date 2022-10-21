import { Product } from "../models/product.model.js";
import BaseRepository from "./baseRepository.js";

let instance;

class ProductDao extends BaseRepository {
  constructor() {
    super(Product);
  }

  getInstance() {
    if (!instance) {
      instance = new ProductDao();
    }
    return instance;
  }
}

export const productDao = new ProductDao();
