export default class Cart {
  items = [];

  add(item) {
    this.items.push(item);
  }

  getTotal() {
    return this.items.reduce((acc, item) => {
      console.log(
        `accumulator: ${acc}, quantity: ${item.quantity}, price: ${item.product.price}`
      );
      return acc + item.quantity * item.product.price;
    }, 0);
  }
}
