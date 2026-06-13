"use client";

import layout from "@/app/styles/layout.module.css";
import SideBar from "../components/ui/sideBar";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className={layout.layout}>

      <SideBar />

      <main className={layout.main}>

        <div className={layout.content}>

          {children}

        </div>

      </main>

    </div>
  );
}