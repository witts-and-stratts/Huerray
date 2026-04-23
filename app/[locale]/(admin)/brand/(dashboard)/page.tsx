import type { Metadata } from "next";
import { BrandDashboard } from "@/components/dashboard/brand-dashboard";
import '@/app/styles/components/dashboard-stats.css';

export const metadata: Metadata = {
  title: "Brand Dashboard",
};

export default async function BrandAdminPage() {
  return <BrandDashboard />;
}
