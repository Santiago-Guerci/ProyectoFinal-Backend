import dotenv from "dotenv";
dotenv.config();

let ProductDao;
let CartDao;

switch (process.env.DATABASE) {
  case "mongo":
    const { default: ProdMongoDao } = await import("./ProdMongoDao.js");
    const { default: CartMongoDao } = await import("./CartMongoDao.js");

    ProductDao = new ProdMongoDao();
    CartDao = new CartMongoDao();

    break;

  case "firebase":
    const { default: ProdFirebaseDao } = await import("./ProdFirebaseDao.js");
    const { default: CartFirebaseDao } = await import("./CartFirebaseDao.js");

    ProductDao = new ProdFirebaseDao();
    CartDao = new CartFirebaseDao();

    break;
}

export { ProductDao, CartDao };
