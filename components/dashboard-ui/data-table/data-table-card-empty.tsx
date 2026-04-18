import { Search } from 'lucide-react';

interface DataTableCardEmptyProps {
  children: React.ReactNode;
}

export function DataTableCardEmpty( { children }: DataTableCardEmptyProps ) {
  return (
    <div className="dt-card-empty">
      <Search size={ 40 } className="dt-card-empty-icon" />
      <p className="dt-card-empty-text">{ children }</p>
    </div>
  );
}
