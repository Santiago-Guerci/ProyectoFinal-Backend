import { productDao } from "../daos/product.dao.js";

const createProduct = async (product) => {
  if (typeof product.name !== "string") throw "Name must be a string!";
  if (typeof product.description !== "string")
    throw "Description must be a string!";
  if (typeof product.code !== "string") throw "Code must be a string!";
  if (typeof product.thumbnail !== "string")
    throw "Thumbnail must be a string!";
  if (typeof product.price !== "number") throw "Price must be a number!";
  if (typeof product.stock !== "number") throw "Stock must be a number!";

  const createdProduct = await productDao.save(product);

  return createdProduct;
};

const getOneProduct = async (id) => {
  if (typeof id !== "string") throw "Product ID must be a string";

  const product = await productDao.getById(id);

  if (!product) throw "Product doesn't exist";

  return product;
};

const getAllProducts = async () => {
  const data = await productDao.getAll();
  return data;
};

const updateProduct = async (id, props) => {
  if (typeof props.name !== "string") throw "Name must be a string!";
  if (typeof props.description !== "string")
    throw "Description must be a string!";
  if (typeof props.code !== "string") throw "Code must be a string!";
  if (typeof props.thumbnail !== "string") throw "Thumbnail must be a string!";
  if (typeof props.price !== "number") throw "Price must be a number!";
  if (typeof props.stock !== "number") throw "Stock must be a number!";
  if (typeof id !== "string") throw "Product ID must be a string";

  const updatedProduct = await productDao.updateProduct(id, props);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  if (typeof id !== "string") throw "Product ID must be a string";
  await productDao.deleteById(id);
};

const deleteAllProducts = async () => {
  await productDao.deleteAll();
};

export const productService = {
  createProduct,
  getOneProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
