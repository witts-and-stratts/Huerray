"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

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

type LegalPageSidebarProps = {
  sections: Section[];
  onSectionClickAction: ( sectionId: string, subsectionId?: string ) => void;
  activeSection: string;
  activeSubsection?: string;
  title: string;
};

export default function LegalPageSidebar( {
  sections,
  onSectionClickAction,
  activeSection,
  activeSubsection,
  title,
}: LegalPageSidebarProps ) {
  const [ expandedSections, setExpandedSections ] = useState<string[]>( [
    activeSection,
  ] );
  const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState( false );
  const containerRef = useRef<HTMLDivElement>( null );
  const ref = useRef<HTMLDivElement>( null );
  const [ becomeFixed, setBecomeFixed ] = useState( false );

  const handleScroll = useCallback( () => {
    const scrollY = window.scrollY;
    const bottom = ref.current?.getBoundingClientRect().bottom || 0;
    const width = containerRef.current?.parentElement?.offsetWidth || 0;
    const padding =
      containerRef.current?.parentElement?.parentElement
        ?.computedStyleMap()
        .get( "padding-left" )
        ?.toString() || "0";
    const isMobile = window.innerWidth <= 768;

    if ( scrollY > bottom + 200 ) {
      if ( !becomeFixed ) {
        if ( !isMobile ) {
          containerRef.current?.style.setProperty(
            "width",
            width + parseInt( padding as string ) + "px",
          );
        }
        setBecomeFixed( true );
      }
    } else {
      if ( becomeFixed ) {
        if ( !isMobile ) {
          containerRef.current?.style.setProperty( "width", width + "px" );
        }
        setBecomeFixed( false );
      }
    }
  }, [ becomeFixed ] );

  useEffect( () => {
    document.addEventListener( "scroll", handleScroll );

    return () => {
      document.removeEventListener( "scroll", handleScroll );
    };
  }, [ handleScroll ] );
  // Separate useEffect for smooth scrolling
  useEffect( () => {
    // Add smooth scrolling behavior to the document
    document.documentElement.style.scrollBehavior = "smooth";

    // Clean up when component unmounts
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, [] );

  const handleSectionClick = ( sectionId: string ) => {
    onSectionClickAction( sectionId );

    // Toggle section expansion
    if ( expandedSections.includes( sectionId ) ) {
      setExpandedSections( expandedSections.filter( ( id ) => id !== sectionId ) );
    } else {
      setExpandedSections( [ ...expandedSections, sectionId ] );
    }

    // Scroll to the section
    const element = document.getElementById( sectionId );
    if ( element ) {
      element.scrollIntoView();
    }
  };

  const handleSubsectionClick = ( sectionId: string, subsectionId: string ) => {
    onSectionClickAction( sectionId, subsectionId );
    const isMobile = window.innerWidth <= 768;

    // Ensure section is expanded
    if ( !expandedSections.includes( sectionId ) ) {
      setExpandedSections( [ ...expandedSections, sectionId ] );
    }

    // Close mobile menu after clicking
    setIsMobileMenuOpen( false );

    // Scroll to the subsection
    const element = document.getElementById( subsectionId );
    if ( element ) {
      if ( isMobile ) {
        window.scrollTo( {
          top: element.offsetTop - 140,
          behavior: "smooth",
        } );
      } else {
        element.scrollIntoView();
      }
    }
  };

  return (
    <div
      ref={ containerRef }
      className={ cn( {
        "top-0 md:top-8 left-0 md:left-6 fixed z-40 w-screen! md:w-auto bg-white px-2 shadow-lg md:shadow-none transition-all duration-300":
          becomeFixed,
      } ) }
    >
      {/* Mobile dropdown toggle */ }
      <div className={ cn( "w-full z-50 pt-4 pb-2 md:hidden" ) } ref={ ref }>
        <button
          onClick={ () => setIsMobileMenuOpen( !isMobileMenuOpen ) }
          className="w-full flex items-center justify-between p-2 bg-primary/5 rounded-lg border border-primary/10"
        >
          <Typography type="h4" as={ "h5" } className="text-primary pl-1 text-md">
            { title }
          </Typography>
          <ChevronDown
            className={ cn( "h-5 w-5 transition-transform", {
              "transform rotate-180": isMobileMenuOpen,
            } ) }
          />
        </button>
      </div>

      {/* Sidebar content - hidden on mobile unless toggled */ }
      <div
        className={ cn(
          "max-h-[calc(100vh-120px)] overflow-y-auto",
          "md:block", // Always visible on medium screens and up
          { hidden: !isMobileMenuOpen }, // Hidden on mobile when not toggled
        ) }
      >
        <Typography type="h4" className="mb-4 text-primary hidden md:block">
          { title }
        </Typography>
        <Accordion
          type="multiple"
          value={ expandedSections }
          onValueChange={ setExpandedSections }
          className="space-y-2"
        >
          { sections.map( ( section ) => (
            <AccordionItem
              key={ section.id }
              value={ section.id }
              className={ cn( "border border-orange/10 rounded-lg", {
                "border-orange/50":
                  activeSection === section.id && !activeSubsection,
              } ) }
            >
              <AccordionTrigger
                onClick={ () => handleSectionClick( section.id ) }
                className="px-4 py-2 hover:no-underline"
              >
                <Typography
                  className={ cn( "font-medium", {
                    "gradient-text":
                      activeSection === section.id && !activeSubsection,
                  } ) }
                >
                  { section.title }
                </Typography>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-2">
                <div className="flex flex-col space-y-2 pl-4">
                  { section.subsections?.map( ( subsection ) => (
                    <button
                      key={ subsection.id }
                      onClick={ () =>
                        handleSubsectionClick( section.id, subsection.id )
                      }
                      className={ cn(
                        "text-left py-1 px-2 rounded hover:bg-primary/5",
                        {
                          "bg-primary/10 text-primary":
                            activeSection === section.id &&
                            activeSubsection === subsection.id,
                        },
                      ) }
                    >
                      <Typography className="text-sm">
                        { subsection.title }
                      </Typography>
                    </button>
                  ) ) }
                </div>
              </AccordionContent>
            </AccordionItem>
          ) ) }
        </Accordion>
      </div>
    </div>
  );
}
