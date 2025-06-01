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

  type Query {
    products: [Product]
  }
`;

module.exports = typeDefs;
