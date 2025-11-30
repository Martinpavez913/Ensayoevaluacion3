import express from "express";
import jwt from "jsonwebtoken";
import { users } from "../data/users.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Buscar usuario en el array
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  // Validar password
  if (user.password !== password) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  // Generar token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Respuesta
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
});

export default router;
