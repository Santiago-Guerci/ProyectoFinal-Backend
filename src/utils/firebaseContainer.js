import admin from "firebase-admin";
import config from "../dbConfig.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

class FirebaseContainer {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }

  //METODOS DE PRODUCTOS
  async save(object) {
    try {
      object.timestamp = Date.now();
      let newObj = await this.collection.add(object);
      console.log(`Product saved with id ${newObj.id}`);
    } catch (error) {
      console.log("There has been an error saving the object. Error: " + error);
    }
  }

  async getById(id) {
    try {
      let doc = await this.collection.doc(id).get();
      return doc;
    } catch (error) {
      console.log("Error getting product. Error: " + error);
    }
  }

  async getAll() {
    try {
      let prodSnapshot = await this.collection.get();
      let prodDoc = prodSnapshot.docs;

      const prodArray = prodDoc.map((prod) => ({
        id: prod.id,
        ...prod.data(),
      }));

      return prodArray;
    } catch (error) {
      console.log(`Error getting all products. Error: ${error}`);
    }
  }

  async updateProduct(id, props) {
    try {
      console.log(props);
      await this.collection.doc(id).update(props);
      console.log(`Product with ${id} updated`);
    } catch (error) {
      console.log(`Error updating product ${id}`);
    }
  }

  async deleteById(id) {
    try {
      await this.collection.doc(id).delete();
      console.log(`Product with id: ${id} deleted`);
    } catch (error) {
      console.log(`Error deleting item ${id}. Error: ${error}`);
    }
  }

  async deleteAll() {
    try {
      let products = await this.getAll();
      products.forEach(async (prod) => {
        await this.deleteById(prod.id);
      });

      console.log(`Collection emptied`);
    } catch (error) {
      console.log(`Error deleting all items. Error: ${error}`);
    }
  }
  //FIN METODOS DE PRODUCTOS

  //METODOS DE CARRITOS
  async createCart() {
    try {
      let timestamp = Date.now();
      let products = [];
      let newCart = await this.collection.add({ timestamp, products });
      console.log(`Cart id: ${newCart.id} has been created`);
    } catch (error) {
      console.log("There has been an error creating the cart. Error: " + error);
    }
  }

  async emptyCart(id) {
    try {
      await this.collection.doc(id).update({ products: [] });
      console.log(`The cart ${id} has been emptied`);
    } catch (error) {
      console.log(`Error emtpying cart ${id}. Error: ${error}`);
    }
  }

  async deleteCart(id) {
    try {
      await this.collection.doc(id).delete();
      console.log(`The cart ${id} has been deleted`);
    } catch (error) {
      console.log(`Error deleting cart ${id}. Error: ${error}`);
    }
  }

  async getProductsById(id) {
    try {
      let cart = await this.getById(id);
      console.log(cart.products);
      return cart.products;
    } catch (error) {
      console.log(`Error getting products from cart ${id}. Error: ${error}`);
    }
  }

  //De los productos que ya tengo, cada prod tiene un id. Lo agarro, y lo meto en el cart solicitado (lo agarro por req.body)
  async postProductOnCart(id, myProd) {
    console.log(myProd);
    try {
      let cart = await this.getById(id);
      cart.products.push(myProd);
      await this.collection.doc(id).update(cart);

      console.log(`The product ${myProd.id} has been added to cart ${id}`);
    } catch (error) {
      console.log(`Error pushing product in cart. Error: ${error}`);
    }
  }

  async deleteProductOfCart(id, prodId) {
    try {
      let cart = await this.getById(id);
      let cartProds = await this.getProductsById(id);
      let index = cartProds.indexOf(prodId);
      cart.products.splice(index, 1);

      await this.collection.doc(id).update({ products: cart.products });
      console.log(`The product ${prodId} has been deleted from cart ${id}`);
    } catch (error) {
      console.log(`Error deleting product from cart. Error: ${error}`);
    }
  }
}

export default FirebaseContainer;
