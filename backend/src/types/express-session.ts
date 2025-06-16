import "express-session";

declare module "express-session" {
  interface SessionData {
    isAuthenticated?: boolean;
    dbConfig?: {
      host: string;
      database: string;
      user: string;
      password: string;
    };
    // Agrega aquí más propiedades personalizadas si necesitas
  }
}
