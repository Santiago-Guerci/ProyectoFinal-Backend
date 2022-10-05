import logger from "../logs/loggers.js";
//Y SI HAGO TODO EN EL CART DIRECTAMENTE, Y TODO LO DE PEDIDO LO BORRO?

const getPedido = async (req, res) => {
  try {
    //ACA TENGO QUE HACER ALGO Y RENDERIZAR LOS DATOS DEL PEDIDO (USER, PRODUCTOS, TOTAL, ETC)
    //TENDRE QUE HACER UN MODEL DE PEDIDO?
    //ADEMAS TENGO QUE MANDAR SMS, MAIL Y WPP

    res.render("pedido.ejs");
  } catch (error) {
    logger.error("Error obteniendo pedido. Info: " + error);
  }
};

const confirmPedido = async (req, res) => {
  try {
    res.render("pedidoOk.ejs");
  } catch (error) {
    logger.error("Error confirmando pedido. Info: " + error);
  }
};

export { getPedido, confirmPedido };
