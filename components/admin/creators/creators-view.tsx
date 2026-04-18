'use client';

import { Table } from "@tanstack/react-table";
import { ModelsCreatorResponse } from "@/lib/api/generated/models";
import { AnimatePresence, motion } from "motion/react";
import { CreatorCard } from "./creator-card";
import { CreatorsTableView } from "./creators-table-view";
import { useTranslations } from "next-intl";
import { TableviewWrapper } from "@/components/table-view-wrapper";
import { DataTableCardEmpty } from "@/components/dashboard-ui/data-table/data-table-card-empty";

interface CreatorsViewProps {
  table: Table<ModelsCreatorResponse>;
  view: "table" | "cards";
  onViewDetails: ( creator: ModelsCreatorResponse ) => void;
  onApproveProfile: ( creator: ModelsCreatorResponse ) => void;
  onRejectProfile: ( creator: ModelsCreatorResponse ) => void;
  showCreatorEmptyState?: boolean;
}

export function CreatorsView( { table, view, onViewDetails, onApproveProfile, onRejectProfile, showCreatorEmptyState = true }: CreatorsViewProps ) {
  const t = useTranslations( 'dashboard.admin' );
  if ( view === "cards" ) {
    // Check if there are rows to display in card view
    if ( table.getRowModel().rows.length === 0 ) {
      return (
        <DataTableCardEmpty>
          { showCreatorEmptyState ? t( 'filters.noCreators' ) : t( 'creatorsTableView.noCreatorsFound' ) }
        </DataTableCardEmpty>
      );
    }

    return (
      <div className="@container p-2 md:p-5">
        <AnimatePresence mode='popLayout'>
          <motion.div
            className="grid grid-cols-2 gap-4 @sm:grid-cols-3 @md:grid-cols-4 @lg:grid-cols-5 @xl:grid-cols-6 @2xl:grid-cols-7"
            variants={ {
              show: { transition: { staggerChildren: 0.04 } },
              exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
            } }
            initial="hidden"
            animate="show"
            exit="exit"
          >
            { table.getRowModel().rows.map( ( row ) => (
              <motion.div
                key={ row.id }
                layout
                variants={ {
                  hidden: { opacity: 0, y: 100 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  exit: { opacity: 0, y: 100, transition: { duration: 0.3 } },
                } }
              >
                <CreatorCard
                  creator={ row.original }
                  onViewDetails={ onViewDetails }
                  onApproveProfile={ onApproveProfile }
                  onRejectProfile={ onRejectProfile }
                />
              </motion.div>
            ) ) }
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return <TableviewWrapper><CreatorsTableView table={ table } /></TableviewWrapper>;
}
