import config from "../config.js";
import mongoose from "mongoose";

await mongoose.connect(config.mongodb.connectionString)

class MongoContainer {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema)
  }

  async save(object) {
    try {
  
    } catch (error) {
      console.log("There has been an error saving the file");
    }
  }

  async getById(id) {
    try {

    } catch (error) {
      console.log("Error reading the file. Error: " + error);
    }
  }

  async getAll() {
    try {
        
    } catch (error) {
        console.log(`Error getting info from getAll. Error: ${error}`)
    }
  }

  async updateProduct(id, props) {
    try {

    } catch (err) {
      console.log(`Error updating product ${id}`);
    }
  }

  async deleteById(id) {
    try {
        
    } catch (error) {
        console.log(`Error deleting item ${id}. Error: ${error}`)
    }
  }

  async deleteAll() {
    try {
        
    } catch (error) {
        console.log(`Error deleting all items. Error: ${error}`)
    }
}

module.exports = MongoContainer;