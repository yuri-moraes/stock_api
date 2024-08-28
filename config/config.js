require("dotenv").config();

module.exports = {
  dialect: "postgres",
  url: process.env.POSTGRES_URL,
  define: {
    timestamps: true,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
