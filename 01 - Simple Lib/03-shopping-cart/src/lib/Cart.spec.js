import Cart from "./Cart";

describe("Cart", () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
    // beforeEach executa uma função antes que cada um dos testes neste arquivo seja executado.
  });

  it("should return 0 when getTotal() is executed in a newly created instance", () => {
    const cart = new Cart();

    expect(cart.getTotal()).toEqual(0);
  });

  it("should multiply quantity and price and receive the total amount", () => {
    const item = {
      product: {
        title: "Adidas running shoes - men",
        price: 35388, //R$ 353,88
      },
      quantity: 2,
    };

    cart.add(item);

    expect(cart.getTotal()).toEqual(70776); //R$ 707.76
  });
});
