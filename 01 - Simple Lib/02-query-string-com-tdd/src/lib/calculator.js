module.exports = {
  sum(n1, n2) {
    return n1 + n2;
  },

  sumIsNotAString(n1, n2) {
    return +n1 + +n2;
    // os + na frente dos n sempre vão garantir que os valores sejam números
  },

  sumOnlyNumbers(n1, n2) {
    const int1 = parseInt(n1, 10);
    const int2 = parseInt(n2, 10);

    if (int1 && Number.NaN(int2)) {
      console.log("Os valores não são números");
    }

    return int1 + int2;
  },
};
