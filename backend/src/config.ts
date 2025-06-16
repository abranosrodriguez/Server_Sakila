const isWindows = process.platform === "win32";

export const dbConfig = {
  host: "bdxzlfnl0hkj6tubc5bu-mysql.services.clever-cloud.com",
  user: "urtbolltvvyvy4yr",
  port: 3306,
  password: isWindows
    ? process.env.DB_PASSWORD_WINDOWS || "NNwetQBHy7Q5l7eN0njj"
    : "mariadb",
  database: "bdxzlfnl0hkj6tubc5bu",
};
