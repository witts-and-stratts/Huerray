export const adminKpis = [
  { label: 'Unread Notifications', value: '54', delta: '+12 today', tone: 'neutral' as const },
  { label: 'Platform Uptime', value: '99.96%', delta: 'Stable', tone: 'neutral' as const },
];

export const campaignKpis = [
  { label: 'Total Campaigns', value: '612', delta: '+6.8%' },
  { label: 'Active Campaigns', value: '312', delta: '+5.4%' },
  { label: 'Finished Campaigns', value: '198', delta: '+4.1%' },
];

export const creatorKpis = [
  { label: 'Total Creators', value: '9,420', delta: '+7.2%' },
  { label: 'Approved Creators', value: '8,110', delta: '+4.9%' },
  { label: 'Pending Creators', value: '1,030', delta: '-1.8%' },
];

export const gigKpis = [
  { label: 'Total Gigs', value: '1,842', delta: '+4.6%' },
  { label: 'Open Gigs', value: '1,128', delta: '+3.1%' },
  { label: 'Completed Gigs', value: '564', delta: '+5.3%' },
];

export const recentGigs = [
  {
    brand: 'Austria Brand',
    brandLogo: 'https://i.pravatar.cc/150?img=14',
    title: 'Spring Product Unboxing',
    url: '/admin/campaigns/4fcb2f63-4491-43ca-882b-23833be056fc/gigs/1',
    submittedAt: 'Feb 21, 2026',
    status: 'open',
  },
  {
    brand: 'Example Brand 01',
    brandLogo: 'https://i.pravatar.cc/150?img=24',
    title: 'Lifestyle Story Feature',
    url: '/admin/campaigns/82534f94-6014-4211-8abb-a1605c8f8820/gigs/2',
    submittedAt: 'Feb 20, 2026',
    status: 'in_progress',
  },
  {
    brand: 'Witts & Stratts',
    brandLogo: 'https://i.pravatar.cc/150?img=34',
    title: 'Weekend Creator Spotlight',
    url: '/admin/campaigns/4fcb2f63-4491-43ca-882b-23833be056fc/gigs/3',
    submittedAt: 'Feb 19, 2026',
    status: 'returned',
  },
  {
    brand: 'Company 07',
    brandLogo: 'https://i.pravatar.cc/150?img=44',
    title: 'Launch Teaser Reel',
    url: '/admin/campaigns/d8103357-6f5d-4b80-94ba-831d32bc9a82/gigs/4',
    submittedAt: 'Feb 18, 2026',
    status: 'completed',
  },
];

export const submissionKpis = [
  { label: 'Total Submissions', value: '805', delta: '+6.2%' },
  { label: 'Pending Submissions', value: '146', delta: '-2.8%' },
  { label: 'Approved Submissions', value: '621', delta: '+4.7%' },
];

export const recentSubmissions = [
  {
    title: 'Weekend Product Walkthrough',
    url: '/admin/submissions/d3a5f999-5d7c-417c-8647-5fc9d6196579',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    brand: 'Austria Brand',
    brandLogo: 'https://i.pravatar.cc/150?img=14',
    creator: 'Ava Johnson',
    submittedAt: 'Feb 21, 2026',
    status: 'pending_approval',
    campaign: 'Q1 Awareness Push',
  },
  {
    title: 'Lifestyle Creator Reel',
    url: '/admin/submissions/0db8c829-6a55-496e-99b5-457d1ec8861e',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    brand: 'Example Brand 01',
    brandLogo: 'https://i.pravatar.cc/150?img=24',
    creator: 'Ethan Cole',
    submittedAt: 'Feb 20, 2026',
    status: 'approved',
    campaign: 'Creator Partnerships',
  },
  {
    title: 'Launch Day Teaser',
    url: '/admin/submissions/d679a2cd-e96b-4b5d-8ca0-9dabb15a8f32',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    brand: 'Witts & Stratts',
    brandLogo: 'https://i.pravatar.cc/150?img=34',
    creator: 'Maya Green',
    submittedAt: 'Feb 19, 2026',
    status: 'returned',
    campaign: 'Spring Collection',
  },
  {
    title: 'Creator Challenge Recap',
    url: '/admin/submissions/515d47e9-4341-4e31-8dde-2b53c6c98c04',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    brand: 'Company 07',
    brandLogo: 'https://i.pravatar.cc/150?img=44',
    creator: 'Leo Brooks',
    submittedAt: 'Feb 18, 2026',
    status: 'approved',
    campaign: 'Creator Challenge',
  },
  {
    title: 'Behind The Scenes Reel',
    url: '/admin/submissions/6e215538-c4b5-4334-a028-aa4945d3c2b2',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    brand: 'Brand 1',
    brandLogo: 'https://i.pravatar.cc/150?img=54',
    creator: 'Nora White',
    submittedAt: 'Feb 17, 2026',
    status: 'pending_approval',
    campaign: 'Studio Stories',
  },
  {
    title: 'Weekly Product Highlight',
    url: '/admin/submissions/01816d10-4ada-42a3-bae1-e6d052f38dee',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    brand: 'Example Brand 01',
    brandLogo: 'https://i.pravatar.cc/150?img=24',
    creator: 'Jack Evans',
    submittedAt: 'Feb 16, 2026',
    status: 'approved',
    campaign: 'Product Discovery',
  },
];

export const recentCreators = [
  { name: 'Amelia Hart', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Noah Lane', avatar: 'https://i.pravatar.cc/150?img=22' },
  { name: 'Sophia Miles', avatar: 'https://i.pravatar.cc/150?img=31' },
  { name: 'Liam Cole', avatar: 'https://i.pravatar.cc/150?img=44' },
  { name: 'Mia Stone', avatar: 'https://i.pravatar.cc/150?img=56' },
  { name: 'Ethan Brooks', avatar: 'https://i.pravatar.cc/150?img=63' },
];

export const usersStatusBreakdown = [
  { status: 'Approved', count: 14210, fill: 'var(--chart-1)' },
  { status: 'Pending Approval', count: 2890, fill: 'var(--chart-2)' },
  { status: 'Returned', count: 920, fill: 'var(--chart-4)' },
  { status: 'Suspended', count: 400, fill: 'var(--chart-5)' },
];

export const platformHealthSeries = [
  { month: 'Sep', users: 9100, campaigns: 142, submissions: 380 },
  { month: 'Oct', users: 10750, campaigns: 176, submissions: 452 },
  { month: 'Nov', users: 12230, campaigns: 212, submissions: 501 },
  { month: 'Dec', users: 13900, campaigns: 236, submissions: 590 },
  { month: 'Jan', users: 16200, campaigns: 280, submissions: 712 },
  { month: 'Feb', users: 18420, campaigns: 312, submissions: 805 },
];

export const pipelineByStatus = [
  { status: 'Created', campaigns: 28, gigs: 54, submissions: 0 },
  { status: 'Pending Approval', campaigns: 42, gigs: 71, submissions: 146 },
  { status: 'Returned', campaigns: 17, gigs: 29, submissions: 38 },
  { status: 'Running / In Progress', campaigns: 128, gigs: 410, submissions: 0 },
  { status: 'Completed', campaigns: 97, gigs: 564, submissions: 621 },
];

export const approvalQueues = [
  { label: 'Users Awaiting Approval', count: 12, slaHours: 18 },
  { label: 'Brand Profiles Awaiting Approval', count: 9, slaHours: 24 },
  { label: 'Creator Profiles Awaiting Approval', count: 23, slaHours: 24 },
  { label: 'Campaigns Pending Admin Review', count: 14, slaHours: 12 },
  { label: 'Video Submissions Pending Decision', count: 146, slaHours: 8 },
];

export const financialSnapshot = [
  { month: 'Sep', revenue: 24000, payouts: 15800 },
  { month: 'Oct', revenue: 28300, payouts: 17700 },
  { month: 'Nov', revenue: 31900, payouts: 20400 },
  { month: 'Dec', revenue: 35400, payouts: 22700 },
  { month: 'Jan', revenue: 41200, payouts: 26100 },
  { month: 'Feb', revenue: 44600, payouts: 28900 },
];

export const operationalAlerts = [
  { title: 'Upload Processing Delay', detail: '12 videos are waiting longer than 15 minutes.', severity: 'high' as const },
  { title: 'Webhook Retries Rising', detail: 'Payment webhook retries increased by 23% today.', severity: 'medium' as const },
  { title: 'Approval Backlog', detail: 'Creator profile approvals exceeded SLA in 2 regions.', severity: 'medium' as const },
  { title: 'API Error Rate', detail: 'Notifications endpoint error rate is within normal range.', severity: 'low' as const },
];

export const recentActivity = [
  { eventName: 'Brand Campaign Decision', eventType: 'Acceptance', actor: 'Austria Brand', time: '2h ago' },
  { eventName: 'Creator Profile Submission', eventType: 'Submission', actor: 'Creator11 Creator11', time: '4h ago' },
  { eventName: 'Brand Profile Submission', eventType: 'Submission', actor: 'Example Brand 01', time: '5h ago' },
  { eventName: 'Brand Campaign Decision', eventType: 'Acceptance', actor: 'Example Brand 01', time: '8h ago' },
  { eventName: 'Creator Profile Submission', eventType: 'Submission', actor: 'Brand05 Brand05', time: '1d ago' },
];
