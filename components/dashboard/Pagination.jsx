import React from "react";

const Pagination = ({ customers, statusStyles }) => {
  return (
    <>
      {customers.length === 0 ? (
        <tr>
          <td
            colSpan={6}
            className="px-5 py-10 text-center text-sm text-gray-400"
          >
            No customers found.
          </td>
        </tr>
      ) : (
        customers.map((customer) => (
          <tr
            key={customer.id}
            className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
          >
            <td className="px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2f3a32] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <span className="font-medium text-gray-900">
                  {customer.name}
                </span>
              </div>
            </td>
            <td className="px-5 py-3.5 text-gray-500 hidden lg:table-cell">
              {customer.email}
            </td>
            <td className="px-5 py-3.5 text-gray-700">{customer.orders}</td>
            <td className="px-5 py-3.5 font-semibold text-gray-900">
              {customer.spent}
            </td>
            <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">
              {customer.joined}
            </td>
            <td className="px-5 py-3.5">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[customer.status]}`}
              >
                {customer.status}
              </span>
            </td>
          </tr>
        ))
      )}
    </>
  );
};

export default Pagination;
