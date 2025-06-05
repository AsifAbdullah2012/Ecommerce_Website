import React from "react";
import { useQuery } from "@apollo/client";
import { GET_VOUCHERS } from "../../graphql/quries";

const colors = [
  "bg-purple-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-orange-200",
];

const VoucherList = () => {
  const { data, loading, error } = useQuery(GET_VOUCHERS);

  if (loading) return <p className="text-center">Loading vouchers...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  if (!data || !data.listVouchers) return <p>No vouchers found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Recommended Vouchers</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.listVouchers.map((voucher, index) => (
          <div
            key={voucher.id}
            className={`rounded-xl p-4 text-center text-gray-800 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer ${
              colors[index % colors.length]
            }`}
          >
            <div className="text-lg font-semibold mb-2">{voucher.code}</div>
            <div className="text-sm mb-1">
              <strong>Type:</strong> {voucher.discount_type}
            </div>
            <div className="text-sm mb-1">
              <strong>Value:</strong> {voucher.discount_value}
            </div>
            <div className="text-sm mb-1">
              <strong>Min Order:</strong> €{voucher.min_order_value}
            </div>
            <div className="text-sm">
              <strong>Status:</strong>{" "}
              <span
                className={
                  voucher.is_active ? "text-green-600" : "text-red-500"
                }
              >
                {voucher.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoucherList;
