import ProductDao from "../daos/product.dao.js";
import { ProductDto } from "../dtos/product.dto.js";

const createProduct = async (product) => {
  if (typeof product.name !== "string") throw "Name must be a string!";
  if (typeof product.description !== "string")
    throw "Description must be a string!";
  if (typeof product.code !== "string") throw "Code must be a string!";
  if (typeof product.thumbnail !== "string")
    throw "Thumbnail must be a string!";
  if (typeof product.price !== "number") throw "Price must be a number!";
  if (typeof product.stock !== "number") throw "Stock must be a number!";

  const createdProduct = await ProductDao.create(product);
  const productDto = new ProductDto(createdProduct);

  return productDto;
};

const getOneProduct = async (id) => {
  if (typeof id !== "string") throw "Product ID must be a string";

  const product = await ProductDao.getById(id);
  const productDto = new ProductDto(product);

  if (!product) throw "Product doesn't exist";

  return productDto;
};

const getAllProducts = async () => {
  const data = await ProductDao.getAll();
  const productDtos = [];
  data.forEach((product) => {
    productDtos.push(new ProductDto(product));
  });
  return productDtos;
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

  const updatedProduct = await ProductDao.update(id, props);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  if (typeof id !== "string") throw "Product ID must be a string";
  await ProductDao.deleteById(id);
};

export const productService = {
  createProduct,
  getOneProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
