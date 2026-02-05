import { Badge } from "@/components/dashboard-ui/badge";

interface CreatorCategoriesProps {
  categories?: string[];
}

export function CreatorCategories( { categories }: CreatorCategoriesProps ) {
  if ( !categories || categories.length === 0 ) return null;

  return (
    <div className="flex flex-wrap gap-2">
      { categories.slice( 0, 3 ).map( ( cat ) => (
        <Badge key={ cat } variant="secondary" className="px-1.5 py-0 text-[10px] font-normal whitespace-nowrap">
          { cat.replace( /_/g, ' ' ) }
        </Badge>
      ) ) }
      { categories.length > 3 && (
        <span className="text-[10px] text-muted-foreground self-center">
          +{ categories.length - 3 }
        </span>
      ) }
    </div>
  );
}
