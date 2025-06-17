import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      description
      price
      image_url
    }
  }
`;

export const GET_VOUCHERS = gql`
  query {
    listVouchers {
      id
      code
      description
      discount_type
      discount_value
      min_order_value
      max_uses
      used_count
      start_date
      expiry_date
      is_active
    }
  }
`;

export const GET_USER_INFO = gql`
  query GetUserInfo($id: ID!) {
    getUserInfo(id: $id) {
      id
      phone_number
      address
      delivery_address
    }
  }
`;

export const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($query: String!) {
    searchProducts(query: $query) {
      id
      name
      description
      price
      image_url
    }
  }
`;
