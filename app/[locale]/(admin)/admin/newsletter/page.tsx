import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NewsletterAdminClient } from "@/components/admin/newsletter/newsletter-admin-client";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( "metadata" );
  return {
    title: t( "admin.newsletter" ),
  };
}

export default function AdminNewsletterPage() {
  return <NewsletterAdminClient />;
}
