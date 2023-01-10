const keyValueToString = ([key, value]) => {
  if (typeof value === "object" && !Array.isArray(value)) {
    throw new Error("Please check you params");
  }
  return `${key}=${value}`;
};

module.exports = {
  queryString(obj) {
    return Object.entries(obj)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  },

  // refatorando a função depois de passar no teste

  // queryString(obj) {
  //   const entries = Object.entries(obj).map((item) => {
  //     return `${item[0]}=${item[1]}`;
  //   });

  //   return entries.join("&");
  // },

  queryStringOnlyObject(obj) {
    return Object.entries(obj).map(keyValueToString).join("&");
  },

  // refatorando a função depois de passar no teste

  // queryStringOnlyObject(obj) {
  //   return Object.entries(obj)
  //     .map(([key, value]) => {
  //       if (typeof value === "object" && !Array.isArray(value)) {
  //         throw new Error("Please check you params");
  //       }
  //       return `${key}=${value}`;
  //     })
  //     .join("&");
  // },
};
