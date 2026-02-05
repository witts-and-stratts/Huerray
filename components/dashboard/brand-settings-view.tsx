'use client';

import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import React, { useState } from 'react';
import { Button } from '@/components/dashboard-ui/button';

export function BrandSettingsView() {
  const [ activeTab, setActiveTab ] = useState( 'general' );

  const tabItems = [
    { value: 'general', label: 'General' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'security', label: 'Security' },
    { value: 'billing', label: 'Billing' },
  ];

  return (
    <>
      <SubHeader
        title="Settings"
        description="Manage your brand settings and preferences"
        tabs={
          <SubHeaderTabs
            value={ activeTab }
            onChange={ setActiveTab }
            tabItems={ tabItems }
          />
        }
      >
      </SubHeader>

      <div className='p-6 space-y-6'>
        { activeTab === 'general' && (
          <div className="bg-card rounded-xl border p-6 space-y-4">
            <h3 className="font-semibold text-lg">General Information</h3>
            <p className="text-sm text-muted-foreground">Update your brand details and public profile.</p>
            {/* Placeholder form */ }
            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        ) }

        { activeTab === 'notifications' && (
          <div className="bg-card rounded-xl border p-6 space-y-4">
            <h3 className="font-semibold text-lg">Notification Preferences</h3>
            <p className="text-sm text-muted-foreground">Choose what updates you want to receive.</p>
          </div>
        ) }

        { activeTab === 'security' && (
          <div className="bg-card rounded-xl border p-6 space-y-4">
            <h3 className="font-semibold text-lg">Security Settings</h3>
            <p className="text-sm text-muted-foreground">Manage your password and security sessions.</p>
          </div>
        ) }

        { activeTab === 'billing' && (
          <div className="bg-card rounded-xl border p-6 space-y-4">
            <h3 className="font-semibold text-lg">Billing & Plans</h3>
            <p className="text-sm text-muted-foreground">Manage your subscription and payment methods.</p>
          </div>
        ) }
      </div>
    </>
  );
}
