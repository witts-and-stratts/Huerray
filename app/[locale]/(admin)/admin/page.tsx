import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( "metadata" );
  return {
    title: t( "admin.dashboard" ),
  };
}

export default async function AdminPage() {
  return <AdminDashboard />;
}
