"use client";

import { CreatorActionMenu } from "@/components/admin/creators/creator-action-menu";
import { CreatorStatusBadge } from "@/components/admin/creators/creator-status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard-ui/avatar";
import { Badge } from "@/components/dashboard-ui/badge";
import { Button } from "@/components/dashboard-ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard-ui/card";
import { Separator } from "@/components/dashboard-ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard-ui/tabs";
import { useCreator } from "@/lib/api/hooks/creators";
import { useUser } from "@/lib/api/hooks/users";
import { formatDate } from "@/lib/utils";
import { ArrowLeftIcon, Calendar01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

interface PageProps {
  params: Promise<{ id: string; }>;
}

export default function CreatorPage( { params }: PageProps ) {
  const { id } = use( params );
  const router = useRouter();

  // Fetch User and Creator details
  const { data: user, isLoading: isUserLoading } = useUser( id );
  const { data: creator, isLoading: isCreatorLoading } = useCreator( id );

  const isLoading = isUserLoading || isCreatorLoading;

  if ( isLoading ) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if ( !user ) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] gap-4">
        <h2 className="text-xl font-semibold">Creator not found</h2>
        <Button onClick={ () => router.back() }>Go back</Button>
      </div>
    );
  }

  const fullName = `${ user.first_name || "" } ${ user.last_name || "" }`.trim() || user.username || "Unknown";
  const initials = fullName.slice( 0, 2 ).toUpperCase();

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */ }
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" onClick={ () => router.back() } className="-ml-2">
            <HugeiconsIcon icon={ ArrowLeftIcon } className="w-5 h-5" />
          </Button>
          <Avatar className="w-20 h-20 border-2 border-background shadow-sm">
            <AvatarImage src={ creator?.profile_image_url || undefined } alt={ fullName } />
            <AvatarFallback className="text-2xl">{ initials }</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{ fullName }</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <HugeiconsIcon icon={ Mail01Icon } className="w-4 h-4" />
                { user.email }
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <HugeiconsIcon icon={ Calendar01Icon } className="w-4 h-4" />
                Joined { formatDate( user.created_at || "" ) }
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <CreatorStatusBadge status={ user.user_status || "active" } />
              { creator?.creator_status && (
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">Profile:</span>
                  <CreatorStatusBadge status={ creator.creator_status } />
                </div>
              ) }
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          { creator && (
            <CreatorActionMenu
              creator={ creator }
              creatorId={ creator.id || user.id }
              onViewDetails={ () => { } } // No-op since we are already on details page
            />
          ) }
        </div>
      </div>

      <Separator />

      {/* Content Tabs */ }
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info */ }
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block text-xs">Full Name</span>
                    <div className="font-medium">{ fullName }</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">Username</span>
                    <div className="font-medium">{ user.username || "-" }</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">Date of Birth</span>
                    <div className="font-medium">{ creator?.date_of_birth ? formatDate( creator.date_of_birth ) : "-" }</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">Gender</span>
                    <div className="font-medium capitalize">{ creator?.gender || "-" }</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">User Type</span>
                    <div className="font-medium capitalize">{ user.user_type || "-" }</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">Phone</span>
                    <div className="font-medium">{ user.phone_number || creator?.phone_number || "-" }</div>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs mb-1">Bio</span>
                  <p className="text-sm whitespace-pre-wrap">{ creator?.bio || "No bio available." }</p>
                </div>
              </CardContent>
            </Card>

            {/* Location */ }
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="col-span-2">
                    <span className="text-muted-foreground block text-xs">Address</span>
                    <div className="font-medium">{ creator?.street || "-" }</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">City</span>
                    <div className="font-medium">{ creator?.city || "-" }</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">State/Region</span>
                    <div className="font-medium">{ creator?.state || "-" }</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">Country</span>
                    <div className="font-medium">{ creator?.country || "-" }</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">Zipcode</span>
                    <div className="font-medium">{ creator?.zipcode || "-" }</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Socials & Categories */ }
            <Card>
              <CardHeader>
                <CardTitle>Social Media & Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block text-xs">Instagram</span>
                    <div className="font-medium">{ creator?.instagram_handle || "-" }</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">TikTok</span>
                    <div className="font-medium">{ creator?.tiktok_handle || "-" }</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">YouTube</span>
                    <div className="font-medium">{ creator?.youtube_handle || "-" }</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">Twitter/X</span>
                    <div className="font-medium">{ creator?.twitter_handle || "-" }</div>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs mb-2">Preferred Categories</span>
                  <div className="flex flex-wrap gap-2">
                    { creator?.preferred_categories?.map( ( cat ) => (
                      <Badge key={ cat } variant="secondary">{ cat }</Badge>
                    ) ) || <span className="text-sm text-muted-foreground">None selected</span> }
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Video */ }
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Application Video</CardTitle>
              </CardHeader>
              <CardContent>
                { creator?.application_video ? (
                  <video
                    src={ creator.application_video }
                    controls
                    className="w-full max-h-[500px] rounded-md bg-black aspect-video"
                  />
                ) : (
                  <div className="text-sm text-muted-foreground">No application video available.</div>
                ) }
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder for portfolio items */ }
              { ( () => {
                let items: string[] = [];
                try {
                  if ( creator?.portfolio ) {
                    const parsed = JSON.parse( creator.portfolio );
                    if ( Array.isArray( parsed ) ) {
                      items = parsed;
                    }
                  }
                } catch ( e ) {
                  console.error( "Failed to parse portfolio", e );
                }

                if ( items.length > 0 ) {
                  return (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                      { items.map( ( url, i ) => (
                        <div key={ i } className="relative overflow-hidden rounded-md bg-muted aspect-square group">
                          <img
                            src={ url }
                            alt={ `Portfolio item ${ i + 1 }` }
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      ) ) }
                    </div>
                  );
                }

                return <div className="text-sm text-muted-foreground">No portfolio items available.</div>;
              } )() }
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bank Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <span className="text-muted-foreground block text-xs">Bank Name</span>
                  <div className="font-medium">{ creator?.bank_name || "-" }</div>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Account Name</span>
                  <div className="font-medium">{ creator?.bank_account_name || "-" }</div>
                </div>
                {/* Sensitive info masked or hidden usually */ }
                <div>
                  <span className="text-muted-foreground block text-xs">Routing Number</span>
                  <div className="font-medium font-mono">{ creator?.bank_routing_number ? "****" + creator.bank_routing_number.slice( -4 ) : "-" }</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tax Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <span className="text-muted-foreground block text-xs">Tax ID</span>
                  <div className="font-medium font-mono">{ creator?.tax_id ? "****" + creator.tax_id.slice( -4 ) : "-" }</div>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Tax Country</span>
                  <div className="font-medium">{ creator?.tax_country || "-" }</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
