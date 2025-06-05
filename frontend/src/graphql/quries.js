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
