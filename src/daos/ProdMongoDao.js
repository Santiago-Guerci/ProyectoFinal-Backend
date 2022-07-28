import MongoContainer from "../utils/mongoContainer.js";

class ProdMongoDao extends MongoContainer {
  constructor() {
    super("products", {
      timestamp: { type: Date, required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      code: { type: String, required: true },
      thumbnail: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
    });
  }
}

export default ProdMongoDao;