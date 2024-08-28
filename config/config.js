require("dotenv").config();

module.exports = {
  url: process.env.DATABASE_URL, // Use a URL de conexão direta
  dialect: "postgres",
  define: {
    timestamps: true,
  },
};
