"use client";


import { SidebarTrigger } from "@/components/dashboard-ui/sidebar";
import { LanguageSelector } from "@/components/LanguageSelector";
import { GlobalSearch } from "./ui/global-search";
import { Notifications } from "./ui/notifications";

export function DashboardHeader() {
  return (
    <>
      <header className="flex px-4 py-2 items-center gap-2 border-b bg-background transition-[width,height] ease-linear justify-between">
        <SidebarTrigger className="-ml-1" />
        <GlobalSearch />
        <div className="flex items-center gap-2">
          <Notifications />
          <LanguageSelector showLabel={ false } />
        </div>
      </header>
    </>
  );
}
