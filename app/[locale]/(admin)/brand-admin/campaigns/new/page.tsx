'use client';

import * as React from 'react';
import { CampaignForm } from '@/components/campaigns/campaign-form';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/dashboard-ui/breadcrumb';
import { SubHeader } from '@/components/subheader';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/dashboard-ui/card';
import { SlashIcon } from 'lucide-react';
import Image from 'next/image';

export default function NewCampaignPage() {
  const [ campaignType, setCampaignType ] = React.useState<'human' | 'ai' | null>( null );

  return (
    <>
      { !campaignType ? (
        <div className="max-w-5xl mx-auto py-12">
          <div className="text-center mb-12">
            <h2 className="text-h4 font-primary font-normal mb-4">Create something that gets noticed</h2>
            <p className='font-light'>Create UGC campaigns with our network of creators to produce authentic user-generated content for your brand.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
            {/* Human Only UGC */ }
            <Card className="flex flex-col h-full hover:border-primary/50 transition-colors cursor-pointer group pt-0" onClick={ () => setCampaignType( 'human' ) }>
              <div className="h-48 bg-green-100/50 rounded-t-lg flex items-center justify-center p-6 pt-16 border-b">
                {/* Placeholder for visual - using simple div structure mimicking the image */ }
                <div className="w-3/4 bg-white rounded-md shadow-sm border border-gray-200 flex flex-col p-2">
                  <div className="h-4 w-full bg-gray-100 mb-2 rounded" />
                  <div className="flex-1 bg-green-50 rounded flex items-center justify-center">
                    <Image src='/images/human-only-ugc.jpg' alt='Human Only UGC' width={ 800 } height={ 500 } />
                  </div>
                </div>
              </div>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-xl mb-2 font-primary text-primary">Human only UGC</CardTitle>
                <CardDescription className="text-base">
                  Leverage our network of creators to produce authentic user-generated content for your brand.
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto justify-center pb-8 pt-4">
                <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Select Human UGC
                </Button>
              </CardFooter>
            </Card>

            {/* AI Enhanced UGC */ }
            <Card className="flex flex-col h-full hover:border-primary/50 transition-colors cursor-pointer group pt-0" onClick={ () => setCampaignType( 'ai' ) }>
              <div className="h-48 bg-blue-100/50 rounded-t-lg flex items-center justify-center p-6 pt-16 border-b">
                {/* Placeholder for visual */ }
                <div className="w-3/4 bg-white rounded-md shadow-sm border border-gray-200 flex flex-col p-2 relative">
                  <div className="absolute bottom-2 right-0 scale-75 bg-white shadow-md rounded-lg px-3 py-2 border flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-xs font-normal">AI Enhancing...</span>

                  </div>
                  <Image src='/images/ai-enhanced-ugc.jpg' alt='AI Enhanced UGC' width={ 800 } height={ 500 } />
                </div>
              </div>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-xl mb-2 font-primary text-primary">AI Enhanced UGC</CardTitle>
                <CardDescription className="text-base">
                  Leverage AI to generate or optimize and enhance creator content for maximum engagement and conversion.
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto justify-center pb-8 pt-4">
                <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Select AI Enhanced
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <CampaignForm />
      ) }
    </>
  );
}
