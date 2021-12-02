const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {
  const authorization = request.get("authorization");

  console.log("authorization:", authorization);

  let token = "";
  if (authorization && authorization.toLocaleLowerCase().startsWith("bearer")) {
    token = authorization.substr(7);
  }

  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!token || !decodedToken.id) {
    return response.status(404).json({ error: "token missing" });
  }

  const { id: userId } = decodedToken;

  request.userId = userId
  next() 
};
