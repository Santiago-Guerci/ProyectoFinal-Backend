import { Product } from "../models/product.model.js";

//METODOS DE PRODUCTOS
const save = async (object) => {
  object.timestamp = Date.now();
  const objectModel = new Product(object);
  const newObj = await objectModel.save();
  return newObj;
};

const getById = async (id) => {
  const product = await Product.findOne({ _id: id }, { __v: 0 });
  return product;
};

const getAll = async () => {
  const products = await Product.find({}, { __v: 0 });
  return products;
};

const updateProduct = async (id, props) => {
  const updatedProduct = await Product.updateOne({ _id: id }, props);
  return updatedProduct;
};

const deleteById = async (id) => {
  await Product.deleteOne({ _id: id });
};

const deleteAll = async () => {
  await Product.deleteMany({});
};
//FIN METODOS DE PRODUCTOS

export const productDao = {
  save,
  getById,
  getAll,
  updateProduct,
  deleteById,
  deleteAll,
};
