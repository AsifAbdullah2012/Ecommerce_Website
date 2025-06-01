const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    image_url: String
    price: Float!
    stock: Int!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    password_hash: String!
    created_at: String!
  }

  type Query {
    products: [Product]
    users: [User] # Admin only
    me: User # Get current logged-in user
  }
  type Mutation {
    # Product-related (later you can add mutations like addProduct, updateProduct)

    # User-related
    register(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String # Returns JWT token
  }
`;

module.exports = typeDefs;
