"use client";
import { useState } from "react";
import Image from "next/image";

interface SidebarProps {
  active: string;
  setActive: (tab: string) => void;
}

const sidebarItems = [
  { id: "inbox", icon: "/sidebaricon/Letter.png" },
  { id: "Google-Docs", icon: "/sidebaricon/Google-Docs.png" },
  { id: "Search", icon: "/sidebaricon/Search.png" },
  { id: "Database", icon: "/sidebaricon/Database.png" },
  { id: "Letter", icon: "/sidebaricon/WaterTransportation.png" },
  { id: "settings", icon: "/sidebaricon/settings.png" },
  { id: "profile", icon: "/sidebaricon/profile.png" },
];

export default function Sidebar({ active, setActive }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // main sidebar visibility
  const [activeDrawer, setActiveDrawer] = useState(""); // currently open drawer

  const handleMenuClick = (id: string) => {
    setActive(id);
    if (id === "inbox") {
      setActiveDrawer(activeDrawer === "inbox" ? "" : "inbox"); // toggle inbox drawer
    } else {
      setActiveDrawer(""); // close drawer for other items
    }
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#065F81] text-white p-2 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar Icon Bar */}
      <div
        className={`fixed top-0 left-0 h-screen w-20 bg-blue-950 flex flex-col items-center py-12 space-y-4
        transform transition-transform duration-300 z-50
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="mb-4 ml-4">
          <Image
            src="/sidebaricon/Water Transportation.png"
            alt="Logo"
            width={40}
            height={40}
          />
        </div>

        <div className="flex-1 flex flex-col space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`p-3 rounded-l-full w-16 ml-4 flex justify-center transition-colors ${
                active === item.id ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <Image src={item.icon} width={24} height={24} alt={item.id} />
            </button>
          ))}
        </div>
      </div>

      {/* Inbox Drawer */}
 
<aside
  className={`fixed top-0 left-20 h-screen w-60 bg-[#00324d] text-white flex flex-col py-8
    transform transition-transform duration-300 lg:w-72 mt-16 lg:mt-0
    ${activeDrawer === "inbox" ? "translate-x-0 z-40 " : "-translate-x-full"} 
    lg:translate-x-0`}
>

  <div className=" p-2 lg:py-10 font-bold text-xl">Inbox</div>
  <nav className="flex-1 px-2">
    <ul className="space-y-2">
      <li className="bg-[#065F81] px-2 py-2 text-sm rounded-lg cursor-pointer">
        Received Enlistment Request
      </li>
      <li className="px-2 py-2 text-sm rounded-lg cursor-pointer hover:bg-[#065F81]">
        Shared Profile
      </li>
      <li className="px-2 py-2 rounded-lg text-sm cursor-pointer hover:bg-[#065F81]">
        Supplier’s Message
      </li>
    </ul>
  </nav>
</aside>


      {/* Overlay for mobile */}
      {(isSidebarOpen || activeDrawer) && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => {
            setIsSidebarOpen(false); // hide sidebar
            setActiveDrawer(""); // hide drawer
          }}
        />
      )}
    </>
  );
}
