const pool = require("../db");

const resolvers = {
  Query: {
    products: async () => {
      const result = await pool.query("SELECT * FROM products");
      console.log(result.rows);
      return result.rows;
    },
  },
};

module.exports = resolvers;
