const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "ALLLIFEMATTERS";

const resolvers = {
  Query: {
    // this is where all the products will be shown
    products: async () => {
      const result = await pool.query("SELECT * FROM products");
      console.log(result.rows);
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
  },
  Mutation: {
    register: async (parent, { name, email, password }) => {
      const hash = password;
      const usr_role = "customer";
      const result = await pool.query(
        "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, role, created_at",
        [name, email, hash]
      );
      return result.rows[0];
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
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      return token;
    },
  },
};

module.exports = resolvers;
