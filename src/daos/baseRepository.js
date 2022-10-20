//Voy a meter el crud de los daos acá, y cada dao va a ser una clase extendida de esta, y en cada dao va a haber metodos unicos de estos mismos.
class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(newModel) {
    const newObject = await this.model.create(newModel);
    return newObject;
  }

  async getById(id) {
    const object = await this.model.findOne({ _id: id }, { __v: 0 });
    return object;
  }

  async getAll() {
    return await this.model.find({}, { __v: 0 });
  }

  async update(id, props) {
    const updatedObject = await this.model.updateOne({ _id: id }, props);
    return updatedObject;
  }

  async deleteById(id) {
    return await this.model.deleteOne({ _id: id });
  }
}

export default BaseRepository;
