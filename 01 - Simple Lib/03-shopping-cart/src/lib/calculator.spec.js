import { sum, sumIsNotAString, sumOnlyNumbers } from "./calculator";

it("should sum 2 and 2 and the result must be 4", () => {
  expect(sum(2, 2)).toBe(4);
  // expect(sum(2, 3)).not.toBe(4);
  // caso queira que o resultado NÃO seja aquilo esperado, basta por o .not antes do .toBe
});

it("should sum 2 and 2 even if one of them is a string", () => {
  expect(sumIsNotAString("2", "2")).toBe(4);

  // teste: deve somar 2 e 2 mesmo que um deles seja uma string
});

it("should throw an error if what is provided to the method cannot be summed", () => {
  expect(() => {
    sumOnlyNumbers(2, 2);
  }).toThrowError();

  // teste: deve gerar um erro se o que for fornecido ao método não puder ser somado
});
