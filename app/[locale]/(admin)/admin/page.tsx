import type { Metadata } from "next";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminPage() {
  return <AdminDashboard />;
}
