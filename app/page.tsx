"use client";

import { useState } from "react";
import Sidebar from "./component/Sidebar";
import Topbar from "./component/Topbar";
import DashboardPage from "./component/DashboardPage";

export default function Home() {
  const [activeTab, setActiveTab] = useState("inbox");

  const renderContent = () => {
    switch (activeTab) {
      case "inbox":
        return <div className="p-6">Inbox Content Here</div>;
      case "messages":
        return <div className="p-6">Messages Content Here</div>;
      case "profile":
        return <div className="p-6">Profile Content Here</div>;
      default:
        return <div className="p-6">{activeTab} Content Here</div>;
    }
  };

  return (
    <div className="flex">
      {/* 🔹 Full-width top menu bar */}
      <Topbar />

      {/* 🔹 Sidebar and content start below top bar */}
      <div className="flex min-h-screen w-full pt-10">
        <Sidebar active={activeTab} setActive={setActiveTab} />
        <DashboardPage></DashboardPage>
      </div>
    </div>
  );
}
