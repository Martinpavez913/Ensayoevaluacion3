import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "El Bearer token es necesario" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = tokenDecoded; 
    console.log("Usuario autenticado:", tokenDecoded); 

    next(); 
  } catch (err) {
    return res.status(401).json({ message: "El Bearer token es incorrecto o ha expirado" });
  }
};

export default checkToken;