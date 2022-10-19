class ProductDto {
  constructor({ _id, name, description, code, thumbnail, price, stock }) {
    this.id = _id,
    this.name = name,
    this.description = description,
    this.code = code,
    this.thumbnail = thumbnail,
    this.price = price,
    this.stock = stock
  }
}

export default ProductDto;
