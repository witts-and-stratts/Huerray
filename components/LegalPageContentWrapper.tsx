"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import LegalPageContent from "@/components/LegalPageContent";

// Using a loose type compatible with the translation JSON structure
// The LegalPageContent component handles the full type internally
type Section = {
  id: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [ key: string ]: any;
};

export default function LegalPageContentWrapper( { sections }: { sections: Section[]; } ) {
  const searchParams = useSearchParams();
  const [ activeSection, setActiveSection ] = useState<string>( sections[ 0 ]?.id || "" );
  const [ activeSubsection, setActiveSubsection ] = useState<string | undefined>( undefined );

  useEffect( () => {
    const section = searchParams.get( "section" );
    const subsection = searchParams.get( "subsection" );

    if ( section ) {
      // Use queueMicrotask to avoid synchronous setState in effect warning
      queueMicrotask( () => {
        setActiveSection( section );
        if ( subsection ) {
          setActiveSubsection( subsection );
        } else {
          setActiveSubsection( undefined );
        }
      } );
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