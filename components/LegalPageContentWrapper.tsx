"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import LegalPageContent from "@/components/LegalPageContent";

type Section = {
  id: string;
  title: string;
  subsections: {
    id: string;
    title: string;
    content?: string;
    list?: any[];
    additionalContent?: string;
  }[];
};

export default function LegalPageContentWrapper( { sections }: { sections: Section[]; } ) {
  const searchParams = useSearchParams();
  const [ activeSection, setActiveSection ] = useState<string>( sections[ 0 ]?.id || "" );
  const [ activeSubsection, setActiveSubsection ] = useState<string | undefined>( undefined );

  useEffect( () => {
    const section = searchParams.get( "section" );
    const subsection = searchParams.get( "subsection" );

    if ( section ) {
      setActiveSection( section );
      if ( subsection ) {
        setActiveSubsection( subsection );
      } else {
        setActiveSubsection( undefined );
      }
    }
  }, [ searchParams ] );

  return (
    <LegalPageContent
      sections={ sections }
      activeSection={ activeSection }
      activeSubsection={ activeSubsection }
    />
  );
}