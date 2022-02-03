import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
  //   const token = req.header("auth-token");
  //   console.log(token);

  //   const regHeaders = req.headers;
  //   console.log(regHeaders);
  const auth = req.headers.authorization;
  //   console.log("authenticate user");
  //   console.log(authHeader);
  if (!auth) {
    throw new Error("Access Denied");
  }
  const token = auth.split(" ")[1]; // removes "Bearer" and only gets the token value
  //   console.log(token);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    // console.log(verified);
    next();
  } catch (error) {
    throw new Error("Access Denied");
  }
};
export default verifyUser;
