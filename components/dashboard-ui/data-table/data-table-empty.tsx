import { Search } from 'lucide-react';

interface DataTableEmptyProps {
  children: React.ReactNode;
}

export function DataTableEmpty( { children }: DataTableEmptyProps ) {
  return (
    <div className="dt-table-empty">
      <Search size={ 40 } className="dt-table-empty-icon" />
      <div>{ children }</div>
    </div>
  );
}
