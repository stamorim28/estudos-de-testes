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

      expect(cart.getTotal().getAmount()).toEqual(0);
      // getAmount() é um metodo do Dinero.js
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

      expect(cart.getTotal().getAmount()).toEqual(70776); //R$ 707.76
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

      expect(cart.getTotal().getAmount()).toEqual(35388);
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

      expect(cart.getTotal().getAmount()).toEqual(41872);
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
          "formatted": "R$3,025.56",
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
          "total": {
            "amount": 302556,
            "currency": "BRL",
            "precision": 2,
          },
        }
      `);
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });

    it("reset the cart when checkout() is called", () => {
      cart.add({
        product: product2,
        quantity: 5,
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe("special conditions", () => {
    it("should apply percentage discount when quantity above minimum is passed", () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 3,
      });

      expect(cart.getTotal().getAmount()).toEqual(74315);
    });
    it("should apply quantity discount for even quantities", () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 4,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });
    it("should apply quantity discount for odd quantities", () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });
    it("should not apply percentage discount when quantity is below or equals minimun", () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 2,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });
    it("should not apply quantity discount for even quantities when conditions is not met", () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });
    it("should receive two or more conditions and determine/apply the best discount. First case.", () => {
      const condition1 = {
        percentage: 80,
        minimum: 2,
      };

      const condition2 = {
        quantity: 2,
      };

      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });
  });
});
