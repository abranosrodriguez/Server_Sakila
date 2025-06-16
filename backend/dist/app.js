"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const filmRoutes_1 = __importDefault(require("./routes/filmRoutes"));
const autenticacion_1 = require("./routes/autenticacion");
const app = (0, express_1.default)();
const publicPath = path_1.default.join(__dirname, "../../frontend/public");
const protectedPath = path_1.default.join(__dirname, "../../frontend/protected");
const distPath = path_1.default.join(__dirname, "../../frontend/dist");
// Middlewares globales
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Configuración de sesión
app.use((0, express_session_1.default)({
    secret: "tu-secreto-muy-seguro-aqui", // cambia por un secreto fuerte y único
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 30, // 30 minutos (ajusta a lo que necesites)
    },
}));
// Rutas de autenticación (login, connect, config, logout)
app.use("/", autenticacion_1.authRouter);
// Middleware para proteger rutas dentro de /protected
app.use("/protected", (req, res, next) => {
    if (!req.session || !req.session.isAuthenticated) {
        // No autenticado, redirige a login
        return res.redirect("/index.html");
    }
    next();
});
// Servir archivos estáticos
app.use(express_1.default.static(publicPath));
app.use("/protected", express_1.default.static(protectedPath));
app.use("/dist", express_1.default.static(distPath));
// API protegida: films
app.use("/api/films", (req, res, next) => {
    if (!req.session || !req.session.isAuthenticated) {
        return res.status(403).json({ message: "Debes iniciar sesión primero." });
    }
    next();
}, filmRoutes_1.default);
exports.default = app;
