import config from "../config.js";
import mongoose from "mongoose";

await mongoose.connect(config.mongodb.connectionString)

class MongoContainer {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema)
  }

  //METODOS DE PRODUCTOS
  async save(object) {
    try {
      object.timestamp = Date.now()
      const objectModel = new this.collection(object)
      const newObj = await objectModel.save()
      console.log(`Object saved with id ${newObj._id}`)
    } catch (error) {
      console.log("There has been an error saving the object. Error: "+error);
    }
  }

  async getById(id) {
    try {
      const doc = await this.collection.findOne({_id: id}, {__v: 0});
      return doc;
    } catch (error) {
      console.log("Error reading getById. Error: " + error);
    }
  }

  async getAll() {
    try {
        const docs = await this.collection.find({}, {__v: 0})
        return docs;
    } catch (error) {
        console.log(`Error reading getAll. Error: ${error}`)
    }
  }

  async updateProduct(id, props) {
    try {
        console.log(props)
        await this.collection.updateOne({_id: id}, props)
        console.log(`Product with ${id} updated`);
    } catch (error) {
        console.log(`Error updating product ${id}`);
    }
  }

  async deleteById(id) {
    try {
        await this.collection.deleteOne({_id: id});
        console.log(`Product with id: ${id} deleted`);
    } catch (error) {
        console.log(`Error deleting item ${id}. Error: ${error}`)
    }
  }

  async deleteAll() {
    try {
        await this.collection.deleteMany({});
        console.log(`Collection emptied`);
    } catch (error) {
        console.log(`Error deleting all items. Error: ${error}`)
    }
}
//FIN METODOS DE PRODUCTOS

//METODOS DE CARRITOS
  async createCart() {
    try {
      let timestamp = Date.now()
      let products = []
      const cartModel = new this.collection.({timestamp, products})
      const newCart = await cartModel.save()
      console.log(`Cart id: ${newCart._id} has been created`);
      return newCart._id;
    } catch (error) {
      console.log("There has been an error creating the cart. Error: "+error);
    }
  }

  async emptyCart(id) {
    try {
      await this.collection.updateOne({_id: id}, {$set: { products: [] } });
      console.log(`The cart ${id} has been emptied`);
    } catch (error) {
      console.log(`Error emtpying cart ${id}. Error: ${error}`);
    }
  }

  async deleteCart(id) {
    try {
      await this.collection.deleteOne({_id: id})
      console.log(`The cart ${id} has been deleted`);
    } catch (error) {
      console.log(`Error deleting cart ${id}. Error: ${error}`);
    }
  }

  async getProductsById(id) {
    try{
      let cart = await this.getById(id);
      console.log(cart.products)
      return cart.products;
      
    } catch (error) {
      console.log(`Error getting products from cart ${id}. Error: ${error}`)
    }
  }

  //De los productos que ya tengo, cada prod tiene un id. Lo agarro, y lo meto en el cart solicitado (lo agarro por req.body)
  async postProductOnCart(id, myProd) {
    console.log(myProd)
    try {
      let cart = await this.getById(id);
      cart.products.push(myProd)
      let cartModel = new this.collection(cart)
      await cartModel.save()
      console.log(`The product ${myProd.id} has been added to cart ${id}`);
    } catch (error) {
      console.log(`Error pushing product in cart. Error: ${error}`);
    }
  }

  async deleteProductOfCart(id, prodId) {
    try {
      let cart = await this.getById(id)
      let cartProds = await this.getProductsById(id)
      let index = cartProds.indexOf(prodId)
      cart.products.splice(index, 1)

      let cartModel = new this.collection(cart)
      await cartModel.save()
      console.log(`The product ${prodId} has been deleted from cart ${id}`);
    } catch (error) {
      console.log(`Error deleting product from cart. Error: ${error}`);
    }
  }
  //FIN METODOS DE CARRITOS

}

module.exports = MongoContainer;