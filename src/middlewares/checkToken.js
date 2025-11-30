import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "El Bearer token es necesario" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // <- ojo: aquí ponemos el payload para que lo usen las rutas
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export default checkToken;
