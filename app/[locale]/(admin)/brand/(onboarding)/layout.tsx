import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Profile - Huerray",
  description: "Complete your brand profile",
};

export default async function OnboardingLayout( {
  children,
  params,
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
