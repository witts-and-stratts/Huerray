"use client";
import { Typography } from "@/components/ui/typography";
import { memo } from "react";

// Improved type definitions
interface TableContent {
  cols: number;
  head: string[];
  body: string[][];
}

interface ContentObject {
  title?: string;
  description?: string;
  content?: ContentProps;
  list?: ( string | ContentObject )[];
  table?: TableContent;
  additionalContent?: ContentProps;
  key?: string;
}

type ContentProps = string | ContentObject | ContentObject[];

// Memoized Content component for better performance
const Content = memo( ( { content }: { content: ContentProps; } ) => {
  if ( typeof content === "string" ) {
    return <Typography className="mb-2 md:mb-4" dangerouslySetInnerHTML={ { __html: content } } />;
  }

  if ( Array.isArray( content ) ) {
    return (
      <>
        { content.map( ( item, index ) => (
          <Content key={ item.key || index } content={ item } />
        ) ) }
      </>
    );
  }

  if ( typeof content === "object" && content !== null ) {
    const elements = Object.entries( content ).map( ( [ key, value ] ) => {
      switch ( key ) {
        case "title":
          return (
            <Typography key={ key } className="font-bold">
              { value }
            </Typography>
          );

        case "description":
          return (
            <Typography key={ key } dangerouslySetInnerHTML={ { __html: value } } />
          );

        case "content":
          return <Content key={ key } content={ value } />;

        case "list":
          if ( !Array.isArray( value ) ) return null;
          return (
            <ul key={ key } className="list-legal list-disc ml-8">
              { value.map( ( item, index ) => (
                <li key={ index }>
                  <Content content={ item } />
                </li>
              ) ) }
            </ul>
          );

        case "table":
          if ( !value || typeof value !== "object" ) return null;
          const tableData = value as TableContent;
          return (
            <table key={ key } className="legal-table">
              <thead>
                <tr>
                  { tableData.head.slice( 0, tableData.cols ).map( ( header, index ) => (
                    <th key={ index }>{ header }</th>
                  ) ) }
                </tr>
              </thead>
              <tbody>
                { tableData.body.map( ( row, rowIndex ) => (
                  <tr key={ rowIndex }>
                    { row.slice( 0, tableData.cols ).map( ( cell, cellIndex ) => (
                      <td key={ cellIndex }>
                        <Content content={ cell } />
                      </td>
                    ) ) }
                  </tr>
                ) ) }
              </tbody>
            </table>
          );

        case "additionalContent":
          return <Content key={ key } content={ value } />;

        default:
          return null;
      }
    } );

    return <>{ elements }</>;
  }

  return null;
} );

Content.displayName = "Content";

// Enhanced type definitions for better type safety
interface ListItem {
  title?: string;
  description?: string;
}

interface Subsection {
  id: string;
  title: string;
  content?: ContentProps;
  list?: ( string | ListItem )[];
  orderedList?: ( string | ListItem )[];
  additionalContent?: ContentProps;
  subsections?: Subsection[];
}

interface Section {
  id: string;
  title: string;
  subsections?: Subsection[];
  content?: ContentProps;
  list?: ( string | ListItem )[];
  orderedList?: ( string | ListItem )[];
  additionalContent?: ContentProps;
}

interface LegalPageContentProps {
  sections: Section[];
  activeSection: string;
  activeSubsection?: string;
}

// Memoized list component to avoid re-renders
const ListRenderer = memo( ( { list }: { list: ( string | ListItem )[]; } ) => (
  <ul className="list-disc pl-6 mb-4 space-y-2">
    { list.map( ( item, index ) => (
      <li key={ index }>
        { typeof item === "string" ? (
          <Typography dangerouslySetInnerHTML={ { __html: item } } />
        ) : (
          <Content content={ item } />
        ) }
      </li>
    ) ) }
  </ul>
) );

const OrderedListRenderer = memo( ( { list }: { list: ( string | ListItem )[]; } ) => (
  <ol className="list-decimal pl-10 mb-4 space-y-2">
    { list.map( ( item, index ) => (
      <li key={ index }>
        { typeof item === "string" ? (
          <Typography dangerouslySetInnerHTML={ { __html: item } } />
        ) : (
          <Content content={ item } />
        ) }
      </li>
    ) ) }
  </ol>
) );

OrderedListRenderer.displayName = "OrderedListRenderer";

ListRenderer.displayName = "ListRenderer";

// Memoized subsection component for better performance
const SubsectionRenderer = memo( ( { subsection }: { subsection: Subsection; } ) => (
  <div id={ subsection.id } className="scroll-mt-24">
    <h3 className="mb-4 text-primary text-h6">
      { subsection.title }
    </h3>

    { subsection.content && <Content content={ subsection.content } /> }

    { subsection.list && subsection.list.length > 0 && (
      <ListRenderer list={ subsection.list } />
    ) }

    { subsection.orderedList && subsection.orderedList.length > 0 && (
      <OrderedListRenderer list={ subsection.orderedList } />
    ) }

    { subsection.subsections && subsection.subsections.length > 0 && (
      <div className="ml-4 space-y-6 mt-6">
        { subsection.subsections.map( ( nestedSubsection ) => (
          <SubsectionRenderer key={ nestedSubsection.id } subsection={ nestedSubsection } />
        ) ) }
      </div>
    ) }

    { subsection.additionalContent && (
      <Content content={ subsection.additionalContent } />
    ) }
  </div>
) );

SubsectionRenderer.displayName = "SubsectionRenderer";

// Main component
export default function LegalPageContent( { sections }: LegalPageContentProps ) {
  return (
    <div className="pl-2 md:pl-10">
      <div className="space-y-12">
        { sections.map( ( section ) => (
          <div key={ section.id }>
            <div id={ section.id } className="scroll-mt-24">
              <h2 className="text-h5 mb-2 font-medium text-primary">
                { section.title }
              </h2>
            </div>

            <div className="space-y-8">
              { section.content && <Content content={ section.content } /> }

              { section.list && section.list.length > 0 && (
                <ListRenderer list={ section.list } />
              ) }

              { section.orderedList && section.orderedList.length > 0 && (
                <OrderedListRenderer list={ section.orderedList } />
              ) }

              { section.subsections?.map( ( subsection ) => (
                <SubsectionRenderer key={ subsection.id } subsection={ subsection } />
              ) ) }

              { section.additionalContent && (
                <Content content={ section.additionalContent } />
              ) }
            </div>
          </div>
        ) ) }
      </div>
    </div>
  );
}