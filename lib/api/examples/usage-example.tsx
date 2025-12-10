/**
 * Example Component: Analytics Dashboard
 * 
 * This component demonstrates how to use the Huerray API SDK
 * with Tanstack Query hooks in a real-world scenario.
 */

'use client';

import { useState } from 'react';
import {
  useBrandAnalytics,
  useBrandAnalyticsByPeriod,
  useCreatorAnalytics
} from '../hooks';

type Period = 'last_week' | 'last_month' | 'last_three_months' | 'last_year';

export function AnalyticsDashboard() {
  const [ period, setPeriod ] = useState<Period>( 'last_month' );
  const [ view, setView ] = useState<'brand' | 'creator'>( 'brand' );

  // Fetch brand analytics for selected period
  const brandAnalytics = useBrandAnalyticsByPeriod( period, {
    enabled: view === 'brand',
  } );

  // Fetch creator analytics (overall)
  const creatorAnalytics = useCreatorAnalytics( {
    enabled: view === 'creator',
  } );

  const currentData = view === 'brand' ? brandAnalytics : creatorAnalytics;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      {/* View Toggle */ }
      <div className="mb-6 flex gap-4">
        <button
          onClick={ () => setView( 'brand' ) }
          className={ `px-4 py-2 rounded ${ view === 'brand' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }` }
        >
          Brand Analytics
        </button>
        <button
          onClick={ () => setView( 'creator' ) }
          className={ `px-4 py-2 rounded ${ view === 'creator' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }` }
        >
          Creator Analytics
        </button>
      </div>

      {/* Period Selector (only for brand view) */ }
      { view === 'brand' && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Select Period:
          </label>
          <select
            value={ period }
            onChange={ ( e ) => setPeriod( e.target.value as Period ) }
            className="px-4 py-2 border rounded"
          >
            <option value="last_week">Last Week</option>
            <option value="last_month">Last Month</option>
            <option value="last_three_months">Last 3 Months</option>
            <option value="last_year">Last Year</option>
          </select>
        </div>
      ) }

      {/* Loading State */ }
      { currentData.isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      ) }

      {/* Error State */ }
      { currentData.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold mb-2">Error Loading Data</h3>
          <p className="text-red-600">{ currentData.error.message }</p>
          <button
            onClick={ () => currentData.refetch() }
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      ) }

      {/* Success State */ }
      { currentData.data && (
        <div className="space-y-6">
          {/* Data Display */ }
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              { view === 'brand' ? 'Brand' : 'Creator' } Analytics
              { view === 'brand' && ` - ${ period.replace( '_', ' ' ) }` }
            </h2>

            <pre className="bg-gray-50 p-4 rounded overflow-auto max-h-96 text-sm">
              { JSON.stringify( currentData.data, null, 2 ) }
            </pre>
          </div>

          {/* Refresh Button */ }
          <div className="flex justify-end">
            <button
              onClick={ () => currentData.refetch() }
              disabled={ currentData.isFetching }
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              { currentData.isFetching ? 'Refreshing...' : 'Refresh Data' }
            </button>
          </div>

          {/* Cache Info */ }
          <div className="text-sm text-gray-500">
            <p>Last updated: { new Date( currentData.dataUpdatedAt ).toLocaleString() }</p>
            <p>Status: { currentData.status }</p>
            <p>Is Stale: { currentData.isStale ? 'Yes' : 'No' }</p>
          </div>
        </div>
      ) }
    </div>
  );
}

/**
 * Example Component: Campaign Manager
 * 
 * Demonstrates CRUD operations with mutations
 */

import {
  useCampaigns,
  useCreateCampaign,
  useUpdateCampaign,
  useDeleteCampaign
} from '../hooks';

export function CampaignManager() {
  const [ newCampaignTitle, setNewCampaignTitle ] = useState( '' );

  // Queries
  const { data: campaigns, isLoading } = useCampaigns();

  // Mutations
  const createCampaign = useCreateCampaign();
  const updateCampaign = useUpdateCampaign();
  const deleteCampaign = useDeleteCampaign();

  const handleCreate = ( e: React.FormEvent ) => {
    e.preventDefault();

    createCampaign.mutate(
      { title: newCampaignTitle, description: 'New campaign' },
      {
        onSuccess: () => {
          setNewCampaignTitle( '' );
          alert( 'Campaign created!' );
        },
        onError: ( error ) => {
          alert( `Error: ${ error.message }` );
        },
      }
    );
  };

  const handleStatusToggle = ( campaignId: string, currentStatus: string ) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

    updateCampaign.mutate(
      { id: campaignId, data: { status: newStatus } },
      {
        onSuccess: () => {
          alert( 'Status updated!' );
        },
      }
    );
  };

  const handleDelete = ( campaignId: string ) => {
    if ( !confirm( 'Are you sure you want to delete this campaign?' ) ) return;

    deleteCampaign.mutate( campaignId, {
      onSuccess: () => {
        alert( 'Campaign deleted!' );
      },
    } );
  };

  if ( isLoading ) {
    return <div>Loading campaigns...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Campaign Manager</h1>

      {/* Create Form */ }
      <form onSubmit={ handleCreate } className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Create New Campaign</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={ newCampaignTitle }
            onChange={ ( e ) => setNewCampaignTitle( e.target.value ) }
            placeholder="Campaign title"
            className="flex-1 px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            disabled={ createCampaign.isPending }
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            { createCampaign.isPending ? 'Creating...' : 'Create' }
          </button>
        </div>
      </form>

      {/* Campaigns List */ }
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Campaigns</h2>

        { ( campaigns as any )?.data?.campaigns?.map( ( campaign: any ) => (
          <div key={ campaign.id } className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{ campaign.title }</h3>
              <p className="text-sm text-gray-600">{ campaign.description }</p>
              <span className={ `text-xs px-2 py-1 rounded ${ campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }` }>
                { campaign.status }
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={ () => handleStatusToggle( campaign.id, campaign.status ) }
                disabled={ updateCampaign.isPending }
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Toggle Status
              </button>
              <button
                onClick={ () => handleDelete( campaign.id ) }
                disabled={ deleteCampaign.isPending }
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ) ) }
      </div>
    </div>
  );
}
