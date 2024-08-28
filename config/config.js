require("dotenv").config();
//DB CONFIG
module.exports = {
  dialect: "postgres",
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  url: process.env.DATABASE_URL, // Use a URL de conexão direta
  define: {
    timestamp: true,
  },
};
