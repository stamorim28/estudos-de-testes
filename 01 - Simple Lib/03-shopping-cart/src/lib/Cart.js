import { find, remove } from "lodash";
import Dinero from "dinero.js";

const Money = Dinero;

Money.defaultCurrency = "BRL";
Money.defaultPrecision = 2;

export default class Cart {
  items = [];

  add(item) {
    const itemToFind = { product: item.product };

    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind);
    }

    this.items.push(item);
  }

  remove(product) {
    remove(this.items, { product });
  }

  getTotal() {
    return this.items.reduce((acc, item) => {
      console.log(
        `accumulator: ${acc}, quantity: ${item.quantity}, price: ${item.product.price}`
      );
      return acc + item.quantity * item.product.price;
    }, 0);
  }

  summary() {
    const total = this.getTotal();
    const items = this.items;

    return {
      total,
      items,
    };
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return {
      total,
      items,
    };
  }
}
