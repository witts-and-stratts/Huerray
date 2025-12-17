import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/dashboard-ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/dashboard-ui/card';
import { Badge } from '@/components/dashboard-ui/badge';

export default async function GigsPage() {
  const t = await getTranslations( 'dashboard.creator.gigsPage' );

  const gigs = [
    {
      id: "1",
      title: "UGC Video for Skincare Brand",
      brand: "GlowUp Co.",
      budget: "$200 - $400",
      deadline: "Oct 15",
      tags: [ "Beauty", "Video", "TikTok" ]
    },
    {
      id: "2",
      title: "Tech Review: Wireless Earbuds",
      brand: "AudioTech",
      budget: "$500",
      deadline: "Oct 20",
      tags: [ "Tech", "Review", "YouTube" ]
    },
    {
      id: "3",
      title: "Lifestyle Photo Shoot",
      brand: "FitLife",
      budget: "$150",
      deadline: "Oct 18",
      tags: [ "Fitness", "Photo", "Instagram" ]
    },
    {
      id: "4",
      title: "App Testing & Promo",
      brand: "DevStudio",
      budget: "$300",
      deadline: "Oct 25",
      tags: [ "Software", "Twitter" ]
    },
    {
      id: "5",
      title: "Unboxing Video",
      brand: "ToyBox",
      budget: "$100",
      deadline: "Oct 12",
      tags: [ "Kids", "Video" ]
    },
    {
      id: "6",
      title: "Fashion Haul Spring Collection",
      brand: "StyleIcon",
      budget: "$600+",
      deadline: "Nov 01",
      tags: [ "Fashion", "Video", "Instagram" ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{ t( 'title' ) }</h1>
        <p className="text-muted-foreground">{ t( 'description' ) }</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        { gigs.map( gig => (
          <Card key={ gig.id } className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="outline">{ gig.brand }</Badge>
              </div>
              <CardTitle className="mt-2 text-lg line-clamp-2">{ gig.title }</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex justify-between border-b pb-2">
                  <span>{ t( 'budget' ) }</span>
                  <span className="font-medium text-foreground">{ gig.budget }</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>{ t( 'deadline' ) }</span>
                  <span className="font-medium text-foreground">{ gig.deadline }</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                { gig.tags.map( tag => (
                  <Badge key={ tag } variant="secondary" className="text-xs bg-muted text-muted-foreground hover:bg-muted/80">{ tag }</Badge>
                ) ) }
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{ t( 'apply' ) }</Button>
            </CardFooter>
          </Card>
        ) ) }
      </div>
    </div>
  );
}
