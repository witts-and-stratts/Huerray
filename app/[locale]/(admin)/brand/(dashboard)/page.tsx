import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BrandDashboard } from "@/components/dashboard/brand-dashboard";
import '@/app/styles/components/dashboard-stats.css';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( "metadata" );
  return {
    title: t( "brand.dashboard" ),
  };
}

export default async function BrandAdminPage() {
  return <BrandDashboard />;
}
