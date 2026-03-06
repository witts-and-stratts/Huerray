import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { SubmissionCard } from '@/components/campaigns/submission-card';
import type { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';

export interface RecentSubmissionItem {
  raw: ModelsVideoSubmissionResponse;
}

interface SubmissionsRecentPanelProps {
  items: RecentSubmissionItem[];
}

export function SubmissionsRecentPanel( { items }: SubmissionsRecentPanelProps ) {
  return (
    <ScrollArea className="h-[420px] pr-2" scrollbar={ { style: { width: '6px', opacity: 0.5 } } }>
      <div className="space-y-2 grid md:grid-cols-2 gap-4">
        { items.map( ( submission ) => (
          <div key={ submission.raw.id || `${ submission.raw.title }-${ submission.raw.created_at }` }>
            <SubmissionCard submission={ submission.raw } layout="mini" />
          </div>
        ) ) }
      </div>
    </ScrollArea>
  );
}
