const logger = (request, response, next) => {
console.log("----Logger----")
  console.log(request.method);
  console.log(request.path);
  console.log(request.baseUrl);
  console.log("---------");
  next();
};

module.exports = logger;
