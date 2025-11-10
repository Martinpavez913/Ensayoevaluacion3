import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "El Bearer token es necesario" });

  const token = authHeader.replace("Bearer ", "");
  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenDecoded);
  } catch (err) {
    return res.status(401).json({ message: "El Bearer token es incorrecto" });
  }
  next();
};

export default checkToken;