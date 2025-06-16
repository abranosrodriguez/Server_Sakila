import "express-session";

declare module "express-session" {
  interface SessionData {
    isAuthenticated?: boolean;
    // Agrega aquí más propiedades personalizadas si necesitas
  }
}
