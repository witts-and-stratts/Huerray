import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/dashboard-ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/dashboard-ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Badge } from '@/components/dashboard-ui/badge';
import { Input } from '@/components/dashboard-ui/input';

export default async function CreatorsPage() {
  const t = await getTranslations( 'dashboard.brand.creatorsPage' );

  const creators = [
    { id: 1, name: "Sarah Styles", handle: "@sarah.fashion", niche: "Fashion", followers: "50k", avatar: "/avatars/c1.jpg" },
    { id: 2, name: "Tech Guru", handle: "@techguru", niche: "Technology", followers: "120k", avatar: "/avatars/c2.jpg" },
    { id: 3, name: "Foodie Fam", handle: "@foodiefam", niche: "Food", followers: "25k", avatar: "/avatars/c3.jpg" },
    { id: 4, name: "Travel Mike", handle: "@travelmike", niche: "Travel", followers: "80k", avatar: "/avatars/c4.jpg" },
    { id: 5, name: "Fitness Jane", handle: "@jane.fit", niche: "Fitness", followers: "200k", avatar: "/avatars/c5.jpg" },
    { id: 6, name: "Gamer X", handle: "@gamerx", niche: "Gaming", followers: "1.2M", avatar: "/avatars/c6.jpg" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{ t( 'title' ) }</h1>
        <p className="text-muted-foreground">{ t( 'description' ) }</p>
      </div>

      <div className="flex w-full items-center space-x-2">
        <Input placeholder={ t( 'search' ) } className="w-[200px] lg:w-[300px]" />
        <Button variant="outline">{ t( 'filter' ) }</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        { creators.map( creator => (
          <Card key={ creator.id } className="text-center group hover:bg-muted/5 transition-colors group-hover:bg-muted/50">
            <CardHeader className="items-center">
              <Avatar className="h-20 w-20 mb-4 transition-transform group-hover:scale-105">
                <AvatarImage src={ creator.avatar } />
                <AvatarFallback className="bg-primary/20 text-primary">{ creator.name.substring( 0, 2 ).toUpperCase() }</AvatarFallback>
              </Avatar>
              <CardTitle>{ creator.name }</CardTitle>
              <CardDescription>{ creator.handle }</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-2 mb-4">
                <Badge variant="secondary">{ creator.niche }</Badge>
              </div>
              <div className="text-sm font-medium">
                { creator.followers } Followers
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{ t( 'connect' ) }</Button>
            </CardFooter>
          </Card>
        ) ) }
      </div>
    </div>
  );
}
