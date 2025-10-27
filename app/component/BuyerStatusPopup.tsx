"use client";
import { useState } from "react";
import { X } from "lucide-react"; // npm i lucide-react

interface BuyerStatusPopupProps {
  onClose: () => void;
}

export default function BuyerStatusPopup({ onClose }: BuyerStatusPopupProps) {
  const [rating, setRating] = useState(4);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 lg:ml-60">
      <div className="bg-gradient-to-b from-[#f8fbff] to-[#e3f2ff] w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl rounded-xl shadow-lg p-3 sm:p-6 md:p-8 relative
                      overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={18} className="sm:hidden" />
          <X size={20} className="hidden sm:inline" />
        </button>

        {/* Header */}
        <h2 className="text-base sm:text-lg md:text-2xl font-bold text-center mb-3 sm:mb-6 text-[#065F81]">
          Status Review
        </h2>

        {/* Info Section */}
        <div className="space-y-2 sm:space-y-3 text-[#065F81] text-xs sm:text-sm">
          {/* Date */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 items-center">
            <span className="font-semibold">Date:</span>
            <span className="col-span-2">MM/DD/YYYY</span>
          </div>

          {/* Company */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 items-center">
            <span className="font-semibold">Company:</span>
            <span className="col-span-2">XXXXXXX</span>
          </div>

          {/* Category */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 items-center">
            <span className="font-semibold">Category:</span>
            <span className="col-span-2">YYYYYY</span>
          </div>

          {/* Country */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 items-center">
            <span className="font-semibold">Country:</span>
            <span className="col-span-2">Bangladesh</span>
          </div>

          {/* Profile + Rating */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 items-center">
            <span className="font-semibold text-xs sm:text-sm">Profile:</span>
            <div className="col-span-2 flex items-center justify-between gap-1 sm:gap-1">
              <button className="px-1 sm:px-2 py-1 bg-white rounded-md hover:bg-blue-50 text-xs sm:text-sm border-gray-400">
                View Profile
              </button>
              <div className="flex items-center gap-1 sm:gap-1">
                <span className="font-semibold text-xs sm:text-sm">Rating:</span>
                <div className="bg-white rounded px-1 py-0.5 flex gap-1 border-gray-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      className={`cursor-pointer text-sm sm:text-base ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 items-start">
            <label className="font-semibold text-xs sm:text-sm">Status:</label>
            <select className="col-span-2 border border-gray-300 bg-white rounded-md px-2 py-1 text-[#065F81] focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs sm:text-sm">
              <option value="">Select Status</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Review</option>
              <option>Canceled</option>
            </select>
          </div>

          {/* Message Box */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 items-start">
            <label className="font-semibold text-xs sm:text-sm">Message:</label>
            <textarea
              rows={4}
              placeholder="Enter message..."
              className="col-span-2 border border-gray-300 rounded-md px-2 py-1 resize-none text-[#065F81] focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Send Button */}
        <div className="text-right mt-3 sm:mt-6">
          <button className="bg-[#0b4b78] hover:bg-[#093a5c] text-white px-4 sm:px-8 py-1.5 sm:py-2 rounded-md transition text-xs sm:text-base">
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
