import Cart from "./Cart";

describe("Cart", () => {
  let cart;
  let product = {
    title: "Adidas running shoes - men",
    price: 35388, //R$ 353,88
  };

  let product2 = {
    title: "Adidas running shoes - men",
    price: 41872,
  };

  beforeEach(() => {
    cart = new Cart();
    // beforeEach executa uma função antes que cada um dos testes neste arquivo seja executado.
  });

  describe("getTotal()", () => {
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

    // fit("should ensure no more than on product exists at a time", () => {
    // o fit roda um único teste pulando os demais
    it("should ensure no more than on product exists at a time", () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product,
        quantity: 1,
      });

      expect(cart.getTotal()).toEqual(35388);
    });

    it("update total when a product gets included and then remove", () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.remove(product);

      expect(cart.getTotal()).toEqual(41872);
    });
  });

  describe("checkout", () => {
    it("should return an object with the total and the list of items", () => {
      cart.add({
        product,
        quantity: 5,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      // o toMatchInlineSnapshot retorna os dados do método passado no expect em uma template string
      expect(cart.summary()).toMatchInlineSnapshot(`
        {
          "items": [
            {
              "product": {
                "price": 35388,
                "title": "Adidas running shoes - men",
              },
              "quantity": 5,
            },
            {
              "product": {
                "price": 41872,
                "title": "Adidas running shoes - men",
              },
              "quantity": 3,
            },
          ],
          "total": 302556,
        }
      `);
      expect(cart.getTotal()).toBeGreaterThan(0);
    });

    it("reset the cart when checkout() is called", () => {
      cart.add({
        product: product2,
        quantity: 5,
      });

      cart.checkout();

      expect(cart.getTotal()).toEqual(0);
    });
  });
});
