import MongoContainer from "../utils/mongoContainer";

class CartMongoDao extends MongoContainer {
  constructor() {
    super("carts", {
      timestamp: { type: Date, required: true },
      products: { type: Array, required: true },
    });
  }
}

export default CartMongoDao;
