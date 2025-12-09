"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import LegalPageSidebar from "@/components/LegalPageSidebar";

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

export default function LegalPageSidebarWrapper({
  sections,
  title,
}: {
  sections: Section[];
  title: string;
}) {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || "",
  );
  const [activeSubsection, setActiveSubsection] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const section = searchParams.get("section");
    const subsection = searchParams.get("subsection");

    if (section) {
      setActiveSection(section);
      if (subsection) {
        setActiveSubsection(subsection);
      } else {
        setActiveSubsection(undefined);
      }
    }
  }, [searchParams]);

  const handleSectionClick = (sectionId: string, subsectionId?: string) => {
    setActiveSection(sectionId);
    setActiveSubsection(subsectionId);

    // Update URL with query parameters
    const url = new URL(window.location.href);
    url.searchParams.set("section", sectionId);
    if (subsectionId) {
      url.searchParams.set("subsection", subsectionId);
    } else {
      url.searchParams.delete("subsection");
    }
    window.history.pushState({}, "", url.toString());
  };

  return (
    <LegalPageSidebar
      sections={sections}
      onSectionClickAction={handleSectionClick}
      activeSection={activeSection}
      activeSubsection={activeSubsection}
      title={title}
    />
  );
}
