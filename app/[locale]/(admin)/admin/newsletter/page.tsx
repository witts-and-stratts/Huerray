import type { Metadata } from "next";
import { NewsletterAdminClient } from "@/components/admin/newsletter/newsletter-admin-client";

export const metadata: Metadata = {
  title: "Newsletter",
};

export default function AdminNewsletterPage() {
  return <NewsletterAdminClient />;
}
