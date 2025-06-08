const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sequelize } = require("./db");

const JWT_SECRET = "ALLLIFEMATTERS";

const resolvers = {
  Query: {
    // this is where all the products will be shown
    products: async () => {
      const result = await pool.query("SELECT * FROM products");
      //console.log(result.rows);
      return result.rows;
    },
    getVoucher: async (_, { id }) => {
      const result = await pool.query("SELECT * FROM vouchers WHERE id = $1", [
        id,
      ]);
      return result.rows[0];
    },
    getUserInfo: async (_, { id }) => {
      const result = await pool.query(
        "SELECT * FROM user_profiles WHERE user_id = $1",
        [id]
      );

      return result.rows[0];
    },

    listVouchers: async () => {
      const result = await pool.query("SELECT * FROM vouchers");
      return result.rows;
    },
    // there are two roles 1. Admin 2. customer
    users: async (parent, args, context) => {
      if (context.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      const result = await pool.query("SELECT * FROM users");
      return result.rows;
    },
    me: async (parent, args, context) => {
      if (!context.user) throw new Error("Not authenticated");
      return context.user;
    },
    searchProducts: async (_, { query }) => {
      const [results] = await sequelize.query(
        `
    SELECT * FROM products
    WHERE to_tsvector('english', name || ' ' || description)
    @@ plainto_tsquery('english', :query)
  `,
        {
          replacements: { query },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return results;
    },
  },
  Mutation: {
    register: async (parent, { name, email, password }) => {
      try {
        const hash = password; // Consider hashing this in future!
        const usr_role = "customer";

        const result = await pool.query(
          "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, role, created_at",
          [name, email, hash]
        );

        return result.rows[0];
      } catch (err) {
        console.log("GraphQL Error:", err);
        if (err.code === "23505") {
          // PostgreSQL unique violation error code
          throw new GraphQLError(
            "Diese E-Mail-Adresse ist bereits registriert. Bitte melde dich an.",
            { extensions: { code: "EMAIL_ALREADY_EXISTS" } }
          );
        }
        throw new GraphQLError("Ein unerwarteter Fehler ist aufgetreten.", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    login: async (parent, { email, password }) => {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      const user = result.rows[0];
      if (!user) throw new Error("User not found");

      const valid = password === user.password_hash;
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign(
        { id: user.id, nam: user.name, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      return token;
    },
  },
};

module.exports = resolvers;
