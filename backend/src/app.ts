import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import filmRoutes from "./routes/filmRoutes";
import { authRouter } from "./routes/autenticacion";
import "express-session";

const app = express();
const publicPath = path.join(__dirname, "../../frontend/public");
const protectedPath = path.join(__dirname, "../../frontend/protected");
const distPath = path.join(__dirname, "../../frontend/dist");

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Configuración de sesión
app.use(
  session({
    secret: "tu-secreto-muy-seguro-aqui", // cambia por un secreto fuerte y único
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 30, // 30 minutos (ajusta a lo que necesites)
    },
  })
);

// Rutas de autenticación (login, connect, config, logout)
app.use("/", authRouter);

// Middleware para proteger rutas dentro de /protected
app.use(
  "/protected",
  (req: Request, res: Response, next: NextFunction): void => {
    if (!req.session || !req.session.isAuthenticated) {
      // No autenticado, redirige a login
      return res.redirect("/index.html");
    }
    next();
  }
);

// Servir archivos estáticos
app.use(express.static(publicPath));
app.use("/protected", express.static(protectedPath));
app.use("/dist", express.static(distPath));

// API protegida: films
app.use(
  "/api/films",
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session.isAuthenticated) {
      return res.status(403).json({ message: "Debes iniciar sesión primero." });
    }
    next();
  },
  filmRoutes
);

export default app;
