import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const ADMIN_EMAIL = "admin@gmail.com";

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token y user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== "test@mail.com" && email !== ADMIN_EMAIL) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  if (password !== "1234") {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  // Definir rol
  const role = email === ADMIN_EMAIL ? "admin" : "user";

  const token = jwt.sign(
  { id: 1, email, role },
  "miClaveSuperSecreta123", // <- clave directamente
  { expiresIn: "1h" }
);
  
res.json({
    token,
    user: { id: 1, email, role }
  });
});

export default router;
