import express from "express";
import mysql from "mysql2/promise";

const router = express.Router();

router.post("/connect", async (req, res) => {
  const { host, database, user, password } = req.body;

  try {
    const conn = await mysql.createConnection({
      host,
      database,
      user,
      password,
    });
    await conn.query("SELECT 1");
    await conn.end();

    // Aquí guardamos en sesión que está autenticado
    req.session.isAuthenticated = true;
    req.session.dbConfig = { host, database, user, password };

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Connection failed:", err.message);
    res.status(401).json({
      success: false,
      message: "Datos incorrectos o conexión fallida.",
    });
  }
});

// Ruta para logout y limpiar sesión
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error al cerrar sesión." });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ success: true });
  });
});

router.get("/config", (req, res) => {
  if (req.session && req.session.isAuthenticated) {
    res.status(200).json({ success: true });
  } else {
    res.status(403).json({ success: false });
  }
});

export { router as authRouter };
