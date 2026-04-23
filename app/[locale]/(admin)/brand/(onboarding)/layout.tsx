import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( "metadata" );
  return {
    title: t( "brand.completeProfile" ),
    description: "Complete your brand profile",
  };
}

export default async function OnboardingLayout( {
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; }>;
} ) {
  return (
    <section className='bg-slate-50/20 flex flex-1 flex-col gap-4 overflow-y-auto'>
      { children }
    </section>
  );
}
