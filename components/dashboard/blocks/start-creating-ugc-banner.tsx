"use client";

import { Button } from "@/components/dashboard-ui/button";
import { ArrowRight, ChevronRight, CirclePlus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CreatorsScroller } from "@/components/creators/CreatorsScroller";

export function StartCreatingUGCBanner() {
  const t = useTranslations( 'dashboard.brand.landing' );
  return (
    <section className="bg-primary/10 relative rounded-2xl py-4 md:py-8">
      <div className="grid grid-cols-1 gap-6 items-center">
        <div className="px-2 md:px-8 text-white md:max-w-4/5 text-balance">
          <h2 className="font-primary text-4xl font-medium leading-none tracking-tight gradient-text">
            { t( 'emptyBanner.title' ) }
          </h2>
          <p className="text-primary/80 text-base md:text-lg pt-2">
            { t( 'emptyBanner.subtitle' ) }
          </p>
        </div>
      </div>
      <div className="-my-4">
        <CreatorsScroller />
      </div>
      <Link href="/brand/campaigns/new" className="px-2 md:px-8 cursor-pointer">
        <Button variant="secondary" className="gap-2 text-lg px-8 py-6 font-normal text-primary hover:bg-primary hover:text-white group" size={ 'lg' }>
          <ChevronRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          { t( 'emptyBanner.cta' ) }
        </Button>
      </Link>
    </section>
  );
}