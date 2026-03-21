import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Video } from 'lucide-react';
import type { ModelsCreatorResponse } from '@/lib/api/generated/models';
import { imgpresets } from '@/lib/utils/imgproxy';

interface CreatorVideoBlockProps {
  creator: ModelsCreatorResponse;
}

export function CreatorVideoBlock( { creator }: CreatorVideoBlockProps ) {
  const videoUrl = creator.application_video?.asset;
  const poster = creator.application_video?.thumbnail ? imgpresets.large( creator.application_video.thumbnail ) : '';

  return (
    <Card className='pt-4'>
      <CardHeader>
        <CardTitle>Application Video</CardTitle>
        <CardDescription>Introduction or portfolio video</CardDescription>
      </CardHeader>
      <CardContent>
        { videoUrl ? (
          <div className="w-full overflow-hidden rounded-lg border border-border/60 bg-black shadow-inner">
            <video
              src={ videoUrl }
              controls
              preload="metadata"
              className='min-h-60'
              poster={ poster }
            />
          </div>
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/20 text-muted-foreground gap-3">
            <Video className="size-10 opacity-20" />
            <p className="text-sm font-medium">No Creator profile video uploaded</p>
          </div>
        ) }
      </CardContent>
    </Card>
  );
}
