import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CreatorDashboard } from "@/components/dashboard/creator-dashboard";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( "metadata" );
  return {
    title: t( "creator.dashboard" ),
  };
}

export default async function CreatorAdminPage() {
  return <CreatorDashboard />;
}
