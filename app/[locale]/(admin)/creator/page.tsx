import type { Metadata } from "next";
import { CreatorDashboard } from "@/components/dashboard/creator-dashboard";

export const metadata: Metadata = {
  title: "Creator Dashboard",
};

export default async function CreatorAdminPage() {
  return <CreatorDashboard />;
}
