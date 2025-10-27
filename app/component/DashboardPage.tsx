// app/dashboard/page.tsx
"use client";

import Image from "next/image";
import StatusButton from "./StatusButton";


const DashboardPage = () => {
  return (
    <div className="flex h-screen bg-[#00324d] w-full lg:flex lg:ml-[360px] z-10">
      {/* Sidebar */}
     
      <div className="p-2 h-screen w-full ">
        <div className="flex justify-end mt-8 mb-6">
          <div className="border-t border-gray-600 flex gap-4 p-2 items-center
    text-[#3381A8] bg-[#e0f4ff] h-[83px] rounded-2xl w-[283px] mr-6 shadow-md">

            <div className="bg-[#3381A8] w-14 h-14 rounded-2xl flex items-center justify-center ml-2">
              <p className="text-3xl text-[#E0F4FF]">AS</p>
            </div>

            <div>
              <p className="text-sm font-bold">Active Ship Management</p>
              <p className="text-xs">TN- 12345678</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-[#e0f4ff]  rounded-sm">
          <h2 className="text-2xl font-bold mb-6">Received Enlistment Request</h2>

          {/* Summary Cards */}
         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
  {["Approved", "Review", "Pending", "Canceled"].map((item, i) => {
    const colors = [
      "bg-[#00324D] text-white",
      "bg-[#065F81] text-white",
      "bg-[#3381A8] text-white",
      "bg-[#B1D2E3] text-[#065F81]",
    ];
    return (
      <div
        key={i}
        className={`p-4 rounded-lg shadow-md flex flex-col items-center justify-center ${colors[i]} w-full min-w-0`}
      >
        <p className="text-lg font-semibold">{item}</p>
        <p className="text-3xl font-bold">00</p>
      </div>
    );
  })}
</div>


          {/* Filters */}
         <div className="flex flex-wrap gap-3 mb-4">
  {[
    { placeholder: "Search here...", icon: "/filtter/Search.png" },
    { placeholder: "Filter by Date", icon: "/filtter/Slider.png" },
    { placeholder: "Filter by Company Name", icon: "/filtter/Slider.png" },
    { placeholder: "Filter by Company Name", icon: "/filtter/Slider.png" },
    { placeholder: "Filter by Country", icon: "/filtter/Slider.png" },
  ].map((filter, i) => (
    <div key={i} className="relative flex-1 min-w-[200px] sm:min-w-[220px]">
      <input
        type="text"
        placeholder={filter.placeholder}
        className="w-full px-3 py-2 pr-10 rounded-md bg-white"
      />
      <Image
        src={filter.icon}
        alt={filter.placeholder}
        width={20}
        height={20}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
      />
    </div>
  ))}
</div>


          {/* Table */}
  <div className="bg-white rounded-md shadow-md overflow-hidden p-1 w-full">
  <table className="w-full table-fixed border-collapse border border-gray-300 text-[10px] sm:text-[12px] md:text-sm">
    <thead className="bg-[#065F81] text-white text-[10px] sm:text-[12px] md:text-sm">
      <tr>
        <th className="border border-gray-300 px-1 py-1 w-1/6 sm:w-1/6 md:w-[100px] wrap-break-word">Date</th>
        <th className="border border-gray-300 px-1 py-1 w-1/6 sm:w-1/6 md:w-[150px] wrap-break-word">Company</th>
        <th className="border border-gray-300 px-1 py-1 w-1/6 sm:w-1/6 md:w-[120px] wrap-break-word">Category</th>
        <th className="border border-gray-300 px-1 py-1 w-1/6 sm:w-1/6 md:w-[120px] wrap-break-word">Country</th>
        <th className="border border-gray-300 px-1 py-1 w-1/6 sm:w-1/6 md:w-[120px] wrap-break-word">Profile</th>
        <th className="border border-gray-300 px-1 py-1 w-1/6 sm:w-1/6 md:w-20 wrap-break-word">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-gray-300">
        <td className="border border-gray-300 px-1 py-1 wrap-break-word">MM/DD/YYYY</td>
        <td className="border border-gray-300 px-1 py-1 wrap-break-word">Lorem</td>
        <td className="border border-gray-300 px-1 py-1 wrap-break-word">Supplier</td>
        <td className="border border-gray-300 px-1 py-1 wrap-break-word">Bangladesh</td>
        <td className="border border-gray-300 px-1 py-1 text-blue-600 cursor-pointer wrap-break-word">View Profile</td>
        <td className="border border-gray-300 px-1 py-1">
          <StatusButton />
        </td>
      </tr>
      {/* More rows */}
    </tbody>
  </table>
</div>








          {/* Pagination */}
          <div className="flex justify-end items-center gap-2 mt-4 font-bold">
            <button className="px-3 py-1  bg-[#94B2CD] rounded">Prev</button>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className={`px-3 py-1  rounded ${n === 1 ? "bg-[#94B2CD] rounded-full " : ""
                  }`}
              >
                {n}
              </button>
            ))}
            <button className="px-3 py-1  bg-[#94B2CD] rounded">Next</button>
          </div>
        </main>
      </div>

    </div>
  );
};

export default DashboardPage;
