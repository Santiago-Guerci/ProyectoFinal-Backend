import { cartService } from "../services/cart.service.js";
import { productService } from "../services/product.service.js";
import { sendSms, sendWpp } from "../config/twilio.config.js";
import sendMail from "../config/nodemailer.config.js";
import dotenv from "dotenv";
dotenv.config();

const ADMIN_WPP = process.env.ADMIN_WPP;
const ADMIN_MAIL = process.env.ADMIN_MAIL;

// NO LO ESTOY USANDO
const postCart = async (req, res) => {
  res.json(await cartService.createCart());
};

const deleteCartById = async (req, res) => {
  let id = req.params.id;
  await cartService.emptyCart(id);
  res.json(await cartService.deleteCart(id));
};

const getProductsOnCartById = async (req, res) => {
  let id = req.params.id;
  res.json(await cartService.cartProducts(id));
};

const getProductsOnCartByUserId = async (req, res) => {
  let cartId = req.user.cartId.toString();
  let userCartProducts = await cartService.cartProducts(cartId);
  res.render("cart.ejs", { cartId, userCartProducts });
};

//Actualmente estoy agarrando un producto del body en vez de traerlo desde la base de datos de productos.
//CORREGIDO, PUSE EL productService.GETBYID PARA TRAERLO DE LA BASE DE DATOS
const postProductsOnCartById = async (req, res) => {
  let cartId = req.user.cartId.toString();
  let product = await productService.getOneProduct(req.params.id);
  await cartService.insertProductOnCart(cartId, product);
  res.redirect("/api/carrito");
};

const deleteProductOfCartById = async (req, res) => {
  //Algo está saliendo mal con el splice. Además, tengo que hacer logica de stock para que no se carguen 2 productos iguales con mismo ID.
  let cartId = req.params.id;
  let prodId = req.params.id_prod;
  await cartService.deleteProductOfCart(cartId, prodId);
  res.redirect("/api/carrito");
};

const getSuccessBuy = async (req, res) => {
  //Me falta hacer la lista de productos y enviarla en el mail y en el wpp.
  let userPhone = req.user.phone;
  let userName = req.user.name;
  let userEmail = req.user.email;
  sendSms(userPhone, "Pedido recibido! El mismo se encuentra en proceso");
  sendWpp(ADMIN_WPP, `Nuevo pedido de ${userName}. Email: ${userEmail}`);
  sendMail(
    ADMIN_MAIL,
    `Nuevo pedido de ${userName}. Email: ${userEmail}`,
    "Listado de productos"
  );
  res.render("success.ejs");
};

export {
  postCart,
  deleteCartById,
  getProductsOnCartById,
  postProductsOnCartById,
  deleteProductOfCartById,
  getProductsOnCartByUserId,
  getSuccessBuy,
};
