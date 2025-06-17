const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum DiscountType {
    percentage
    fixed
  }
  type Product {
    id: ID!
    name: String!
    description: String
    image_url: String
    price: Float!
    stock: Int!
  }
  type Voucher {
    id: ID!
    code: String!
    description: String
    discount_type: DiscountType!
    discount_value: Float!
    min_order_value: Float
    max_uses: Int
    used_count: Int
    start_date: String! # or use a custom scalar like Date
    expiry_date: String! # or use a custom scalar like Date
    is_active: Boolean
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    password_hash: String!
    created_at: String!
  }

  type UserInfo {
    id: ID!
    phone_number: String!
    address: String!
    delivery_address: String!
  }

  type Query {
    products: [Product]
    users: [User] # Admin only
    me: User # Get current logged-in user
    getVoucher(id: ID!): Voucher
    listVouchers: [Voucher!]!
    getUserInfo(id: ID!): UserInfo
    searchProducts(query: String!): [Product]
  }
  type Mutation {
    # Product-related (later you can add mutations like addProduct, updateProduct)

    # User-related
    register(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String # Returns JWT token
  }
`;

module.exports = typeDefs;
