import { CartDao, ProductDao } from "../daos/index.js";

// NO LO ESTOY USANDO
const postCart = async (req, res) => {
  res.json(await CartDao.createCart());
};

const deleteCartById = async (req, res) => {
  let id = req.params.id;
  await CartDao.emptyCart(id);
  res.json(await CartDao.deleteCart(id));
};

const getProductsOnCartById = async (req, res) => {
  let id = req.params.id;
  res.json(await CartDao.getProductsById(id));
};

const getProductsOnCartByUserId = async (req, res) => {
  let cartId = req.user.cartId.toString();
  let userCartProducts = await CartDao.getProductsById(cartId);
  res.render("cart.ejs", { cartId, userCartProducts });
};

//Actualmente estoy agarrando un producto del body en vez de traerlo desde la base de datos de productos.
//CORREGIDO, PUSE EL PRODUCTDAO.GETBYID PARA TRAERLO DE LA BASE DE DATOS
const postProductsOnCartById = async (req, res) => {
  let cartId = req.user.cartId.toString();
  let prodId = await ProductDao.getById(req.params.id);
  await CartDao.postProductOnCart(cartId, prodId);
  res.redirect("/api/carrito");
};

const deleteProductOfCartById = async (req, res) => {
  let cartId = req.params.id;
  let prodId = req.params.id_prod;
  await CartDao.deleteProductOfCart(cartId, prodId);
  res.redirect("/api/carrito");
};

export {
  postCart,
  deleteCartById,
  getProductsOnCartById,
  postProductsOnCartById,
  deleteProductOfCartById,
  getProductsOnCartByUserId,
};
