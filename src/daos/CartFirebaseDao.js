import FirebaseContainer from "../utils/firebaseContainer";

class CartFirebaseDao extends FirebaseContainer {
  constructor() {
    super("carts", {
      timestamp: { type: Date, required: true },
      products: { type: Array, required: true },
    });
  }
}

export default CartFirebaseDao;
