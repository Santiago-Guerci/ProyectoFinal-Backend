export default class UserDto {
  constructor({
    _id,
    email,
    name,
    address,
    age,
    phone,
    imageUrl,
    role,
    cartId,
  }) {
    (this.id = _id),
      (this.email = email),
      (this.name = name),
      (this.address = address),
      (this.age = age),
      (this.phone = phone),
      (this.imageUrl = imageUrl),
      (this.role = role),
      (this.cartId = cartId);
  }
}
