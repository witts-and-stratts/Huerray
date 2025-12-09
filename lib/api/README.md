# Huerray API SDK

This directory contains the TypeScript SDK for the Huerray Backend API, generated from the OpenAPI specification and integrated with Tanstack Query for efficient data fetching.

## 📁 Directory Structure

```
lib/api/
├── generated/          # Auto-generated API client (DO NOT EDIT MANUALLY)
├── hooks/             # Tanstack Query hooks
│   ├── analytics.ts   # Analytics query hooks
│   ├── campaigns.ts   # Campaign query & mutation hooks
│   └── index.ts       # Barrel export
├── examples/          # Usage examples
├── client.ts          # API client configuration
├── query-provider.tsx # React Query provider
└── README.md          # This file
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate the SDK

```bash
npm run generate-sdk
```

This will:
- Download the latest OpenAPI spec from `https://backend.huerray.de/swagger/doc.json`
- Generate TypeScript types and API clients
- Place them in `lib/api/generated/`

### 3. Set Up Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://backend.huerray.de/api/v1
```

### 4. Wrap Your App with QueryProvider

In your root layout or `_app.tsx`:

```tsx
import { QueryProvider } from '@/lib/api/query-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
```

## 📖 Usage Examples

### Using Query Hooks (Fetching Data)

```tsx
'use client';

import { useBrandAnalytics } from '@/lib/api/hooks';

export function BrandDashboard() {
  const { data, isLoading, error, refetch } = useBrandAnalytics();

  if (isLoading) return <div>Loading analytics...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Brand Analytics</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => refetch()}>Refresh</button>
    </div>
  );
}
```

### Using Query Hooks with Parameters

```tsx
import { useBrandAnalyticsByPeriod } from '@/lib/api/hooks';

export function MonthlyReport() {
  const { data } = useBrandAnalyticsByPeriod('last_month', {
    // Optional: customize query options
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: true, // Only fetch when this is true
  });

  return <div>Monthly Revenue: {data?.data?.revenue}</div>;
}
```

### Using Mutation Hooks (Creating/Updating Data)

```tsx
import { useCreateCampaign } from '@/lib/api/hooks';
import { useState } from 'react';

export function CreateCampaignForm() {
  const [title, setTitle] = useState('');
  const createCampaign = useCreateCampaign();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createCampaign.mutate(
      { title, description: 'New campaign' },
      {
        onSuccess: (data) => {
          alert('Campaign created successfully!');
          setTitle('');
        },
        onError: (error) => {
          alert(`Failed to create campaign: ${error.message}`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Campaign title"
      />
      <button type="submit" disabled={createCampaign.isPending}>
        {createCampaign.isPending ? 'Creating...' : 'Create Campaign'}
      </button>
    </form>
  );
}
```

### Optimistic Updates

```tsx
import { useUpdateCampaign, campaignsKeys } from '@/lib/api/hooks';
import { useQueryClient } from '@tanstack/react-query';

export function UpdateCampaignButton({ campaignId }: { campaignId: string }) {
  const queryClient = useQueryClient();
  const updateCampaign = useUpdateCampaign();

  const handleUpdate = () => {
    updateCampaign.mutate(
      { id: campaignId, data: { status: 'active' } },
      {
        // Optimistically update the UI before the API responds
        onMutate: async (newData) => {
          // Cancel outgoing refetches
          await queryClient.cancelQueries({ 
            queryKey: campaignsKeys.detail(campaignId) 
          });

          // Snapshot previous value
          const previousCampaign = queryClient.getQueryData(
            campaignsKeys.detail(campaignId)
          );

          // Optimistically update to new value
          queryClient.setQueryData(
            campaignsKeys.detail(campaignId),
            (old: any) => ({ ...old, status: 'active' })
          );

          return { previousCampaign };
        },
        // Rollback on error
        onError: (err, newData, context) => {
          queryClient.setQueryData(
            campaignsKeys.detail(campaignId),
            context?.previousCampaign
          );
        },
      }
    );
  };

  return <button onClick={handleUpdate}>Activate Campaign</button>;
}
```

## 🔐 Authentication

### Setting Auth Token

After successful login:

```tsx
import { setAuthToken } from '@/lib/api/client';

function handleLogin(token: string) {
  setAuthToken(token);
  // Token is now automatically included in all API requests
}
```

### Clearing Auth Token

On logout:

```tsx
import { clearAuthToken } from '@/lib/api/client';

function handleLogout() {
  clearAuthToken();
  // Clear React Query cache
  queryClient.clear();
}
```

### Checking Authentication Status

```tsx
import { isAuthenticated } from '@/lib/api/client';

if (isAuthenticated()) {
  // User is logged in
}
```

## 🔄 Regenerating the SDK

Whenever the backend API changes, regenerate the SDK:

```bash
npm run generate-sdk
```

This will:
1. Download the latest OpenAPI specification
2. Regenerate all TypeScript types and API clients
3. Preserve your custom hooks and configuration

## 🎯 Creating New Hooks

To add hooks for a new endpoint (e.g., "gigs"):

1. Create `lib/api/hooks/gigs.ts`:

```tsx
import { useQuery } from '@tanstack/react-query';
import { GigsApi } from '../generated/api';
import { apiClient, apiConfiguration } from '../client';

const gigsApi = new GigsApi(apiConfiguration, undefined, apiClient);

export const gigsKeys = {
  all: ['gigs'] as const,
  list: () => [...gigsKeys.all, 'list'] as const,
};

export function useGigs() {
  return useQuery({
    queryKey: gigsKeys.list(),
    queryFn: async () => {
      const response = await gigsApi.gigsGetAll();
      return response.data;
    },
  });
}
```

2. Export from `lib/api/hooks/index.ts`:

```tsx
export { useGigs, gigsKeys } from './gigs';
```

## 🛠️ Customization

### Adjusting Query Defaults

Edit `lib/api/query-provider.tsx`:

```tsx
staleTime: 60 * 1000,     // How long data is "fresh"
gcTime: 5 * 60 * 1000,    // How long to keep in cache
retry: 1,                  // Retry failed requests
refetchOnWindowFocus: false, // Don't refetch on focus
```

### Custom Request Interceptor

Edit `lib/api/client.ts` to add custom headers or logic:

```tsx
instance.interceptors.request.use((config) => {
  // Add custom headers
  config.headers['X-Custom-Header'] = 'value';
  return config;
});
```

## 📚 Resources

- [Tanstack Query Docs](https://tanstack.com/query/latest)
- [OpenAPI Generator](https://openapi-generator.tech/)
- [Axios Documentation](https://axios-http.com/)
