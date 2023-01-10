import { queryString, queryStringOnlyObject } from "./queryString";

describe("Object to query string", () => {
  //describe é um bloco que agrupa vários testes com mesmas relações
  it("should create a valid query string when an object is provided", () => {
    const obj = {
      name: "Stenio",
      profession: "developer",
    };

    expect(queryString(obj)).toBe("name=Stenio&profession=developer");

    //teste: deve criar uma consulta válida quando um objeto é fornecido
  });

  it("should create a valid query string even when an array is passed as value", () => {
    const obj = {
      name: "Stenio",
      abilities: ["JS", "Vue"],
    };

    expect(queryString(obj)).toBe("name=Stenio&abilities=JS,Vue");

    //teste: deve criar uma string de consulta válida mesmo quando um array é passado como valor
  });

  it("should throw an error when an object is passed as value", () => {
    const obj = {
      name: "Stenio",
      abilities: {
        first: "JS",
        second: "Vue",
      },
    };

    expect(() => {
      queryStringOnlyObject(obj);
    }).toThrowError();

    //teste: deve lançar um erro quando um objeto é passado como valor
  });
});
