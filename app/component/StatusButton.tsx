"use client";
import { useState } from "react";
import BuyerStatusPopup from "./BuyerStatusPopup";

export default function StatusButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          bg-green-600 hover:bg-green-700 text-white 
          px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2
          text-[10px] sm:text-xs lg:text-sm
          rounded-md w-full sm:w-auto
          transition-colors duration-200
        "
      >
        Approved
      </button>

      {open && <BuyerStatusPopup onClose={() => setOpen(false)} />}
    </>
  );
}
