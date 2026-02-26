import { Badge } from "@/components/dashboard-ui/badge";

interface CreatorCategoriesProps {
  categories?: string[];
  showAll?: boolean;
}

export function CreatorCategories( { categories, showAll = false }: CreatorCategoriesProps ) {
  if ( !categories || categories.length === 0 ) return null;

  const visible = showAll ? categories : categories.slice( 0, 3 );
  const overflow = showAll ? 0 : categories.length - 3;

  return (
    <div className="flex flex-wrap gap-2">
      { visible.map( ( cat ) => (
        <Badge key={ cat } variant="secondary" className="px-1.5 py-0 text-[10px] font-normal whitespace-nowrap capitalize">
          { cat.replace( /_/g, ' ' ) }
        </Badge>
      ) ) }
      { overflow > 0 && (
        <span className="text-[10px] text-muted-foreground self-center">
          +{ overflow }
        </span>
      ) }
    </div>
  );
}
