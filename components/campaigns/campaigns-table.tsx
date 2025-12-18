'use client';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/dashboard-ui/button';
import { Checkbox } from '@/components/dashboard-ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dashboard-ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard-ui/table';
import { cn } from '@/lib/dashboard-utils';
import {
  EyeIcon,
  FilterHorizontalIcon,
  SearchIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '../dashboard-ui/avatar';
import { ButtonGroup } from '../dashboard-ui/button-group';
import { SuperField } from '../dashboard-ui/super-field';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '../dashboard-ui/tooltip';
import { MotionTableCell, MotionTableRow } from '../dashboard-ui/motion-table';

type Person = {
  first_name: string;
  last_name: string;
  avatar: string;
};

type ModelCampaign = {
  campaign_id: string;
  campaign_name: string;
  description: string;
  campaign_status: string;
  number_of_creators_wanted: number;
  number_of_videos_wanted: number;
  category: string;
  content_type: string;
  video_format?: string;
  video_duration_in_seconds: number;
  created_at: string;
  updated_at: string;
  brand_accepted: boolean;
  submissions?: number;
  creators?: Person[];
  product_image?: string;
  product_url: string;
  applications?: Person[];
  status?:
    | 'created'
    | 'pending_approval'
    | 'returned'
    | 'gigs_approved'
    | 'running'
    | 'completed'
    | 'deactivated';
};

const campaigns: ModelCampaign[] = [
  {
    campaign_id: '1',
    campaign_name: 'Summer Collection Launch',
    description:
      'Showcase our new summer fashion line with vibrant, energetic content',
    campaign_status: 'running',
    number_of_creators_wanted: 12,
    number_of_videos_wanted: 24,
    category: 'fashion',
    content_type: 'video',
    video_format: 'mp4',
    video_duration_in_seconds: 30,
    created_at: '2024-06-01T00:00:00Z',
    updated_at: '2024-12-15T00:00:00Z',
    brand_accepted: true,
    applications: [
      {
        first_name: 'Emma',
        last_name: 'Wilson',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        first_name: 'James',
        last_name: 'Anderson',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      {
        first_name: 'Sophia',
        last_name: 'Martinez',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      {
        first_name: 'Oliver',
        last_name: 'Taylor',
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
      {
        first_name: 'Ava',
        last_name: 'Thomas',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
    ],
    creators: [
      {
        first_name: 'Emma',
        last_name: 'Wilson',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        first_name: 'James',
        last_name: 'Anderson',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      {
        first_name: 'Sophia',
        last_name: 'Martinez',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
    ],
    product_image: 'https://via.placeholder.com/150',
    product_url: 'https://via.placeholder.com/150',
  },
  {
    campaign_id: '2',
    campaign_name: 'Back to School Campaign',
    description:
      'Educational content featuring study tips and productivity hacks',
    campaign_status: 'running',
    number_of_creators_wanted: 8,
    number_of_videos_wanted: 16,
    category: 'education',
    content_type: 'video',
    video_format: 'mp4',
    video_duration_in_seconds: 60,
    created_at: '2024-08-15T00:00:00Z',
    updated_at: '2024-12-10T00:00:00Z',
    brand_accepted: true,
    applications: [
      {
        first_name: 'Liam',
        last_name: 'Garcia',
        avatar: 'https://i.pravatar.cc/150?img=6',
      },
      {
        first_name: 'Isabella',
        last_name: 'Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=7',
      },
      {
        first_name: 'Noah',
        last_name: 'Hernandez',
        avatar: 'https://i.pravatar.cc/150?img=8',
      },
    ],
    creators: [
      {
        first_name: 'Liam',
        last_name: 'Garcia',
        avatar: 'https://i.pravatar.cc/150?img=6',
      },
      {
        first_name: 'Isabella',
        last_name: 'Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=7',
      },
    ],
    product_image: 'https://via.placeholder.com/150',
    product_url: 'https://via.placeholder.com/150',
  },
  {
    campaign_id: '3',
    campaign_name: 'Holiday Sale Promo',
    description: 'Create excitement around our biggest sale of the year',
    campaign_status: 'created',
    number_of_creators_wanted: 15,
    number_of_videos_wanted: 30,
    category: 'other',
    content_type: 'video',
    video_format: 'mp4',
    video_duration_in_seconds: 45,
    created_at: '2024-11-15T00:00:00Z',
    updated_at: '2024-11-15T00:00:00Z',
    brand_accepted: false,
    applications: [],
    creators: [],
    product_image: 'https://via.placeholder.com/150',
    product_url: 'https://via.placeholder.com/150',
  },
  {
    campaign_id: '4',
    campaign_name: 'Spring Refresh',
    description: 'Beauty and wellness content for the spring season',
    campaign_status: 'completed',
    number_of_creators_wanted: 15,
    number_of_videos_wanted: 30,
    category: 'beauty',
    content_type: 'video',
    video_format: 'mp4',
    video_duration_in_seconds: 30,
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-05-31T00:00:00Z',
    brand_accepted: true,
    applications: [
      {
        first_name: 'Mia',
        last_name: 'Lopez',
        avatar: 'https://i.pravatar.cc/150?img=9',
      },
      {
        first_name: 'Elijah',
        last_name: 'Gonzalez',
        avatar: 'https://i.pravatar.cc/150?img=10',
      },
      {
        first_name: 'Charlotte',
        last_name: 'Perez',
        avatar: 'https://i.pravatar.cc/150?img=11',
      },
      {
        first_name: 'William',
        last_name: 'Sanchez',
        avatar: 'https://i.pravatar.cc/150?img=12',
      },
    ],
    creators: [
      {
        first_name: 'Mia',
        last_name: 'Lopez',
        avatar: 'https://i.pravatar.cc/150?img=9',
      },
      {
        first_name: 'Elijah',
        last_name: 'Gonzalez',
        avatar: 'https://i.pravatar.cc/150?img=10',
      },
    ],
    product_image: 'https://via.placeholder.com/150',
    product_url: 'https://via.placeholder.com/150',
  },
  {
    campaign_id: '5',
    campaign_name: 'Fitness Challenge 2024',
    description:
      'Motivational fitness content showcasing workout routines and healthy lifestyle',
    campaign_status: 'running',
    number_of_creators_wanted: 10,
    number_of_videos_wanted: 20,
    category: 'health',
    content_type: 'video',
    video_format: 'mp4',
    video_duration_in_seconds: 45,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-12-18T00:00:00Z',
    brand_accepted: true,
    applications: [
      {
        first_name: 'Amelia',
        last_name: 'Rivera',
        avatar: 'https://i.pravatar.cc/150?img=13',
      },
      {
        first_name: 'Benjamin',
        last_name: 'Torres',
        avatar: 'https://i.pravatar.cc/150?img=14',
      },
      {
        first_name: 'Harper',
        last_name: 'Flores',
        avatar: 'https://i.pravatar.cc/150?img=15',
      },
      {
        first_name: 'Lucas',
        last_name: 'Ramirez',
        avatar: 'https://i.pravatar.cc/150?img=16',
      },
      {
        first_name: 'Evelyn',
        last_name: 'Cruz',
        avatar: 'https://i.pravatar.cc/150?img=17',
      },
      {
        first_name: 'Henry',
        last_name: 'Morales',
        avatar: 'https://i.pravatar.cc/150?img=18',
      },
    ],
    creators: [
      {
        first_name: 'Amelia',
        last_name: 'Rivera',
        avatar: 'https://i.pravatar.cc/150?img=13',
      },
      {
        first_name: 'Benjamin',
        last_name: 'Torres',
        avatar: 'https://i.pravatar.cc/150?img=14',
      },
      {
        first_name: 'Harper',
        last_name: 'Flores',
        avatar: 'https://i.pravatar.cc/150?img=15',
      },
      {
        first_name: 'Lucas',
        last_name: 'Ramirez',
        avatar: 'https://i.pravatar.cc/150?img=16',
      },
    ],
    product_image: 'https://via.placeholder.com/150',
    product_url: 'https://via.placeholder.com/150',
  },
  {
    campaign_id: '6',
    campaign_name: 'Tech Gadget Reviews',
    description: 'Authentic reviews and unboxing of our latest tech products',
    campaign_status: 'running',
    number_of_creators_wanted: 6,
    number_of_videos_wanted: 12,
    category: 'technology',
    content_type: 'video',
    video_format: 'mp4',
    video_duration_in_seconds: 90,
    created_at: '2024-09-01T00:00:00Z',
    updated_at: '2024-12-17T00:00:00Z',
    brand_accepted: true,
    applications: [
      {
        first_name: 'Alexander',
        last_name: 'Ortiz',
        avatar: 'https://i.pravatar.cc/150?img=19',
      },
      {
        first_name: 'Ella',
        last_name: 'Reyes',
        avatar: 'https://i.pravatar.cc/150?img=20',
      },
      {
        first_name: 'Sebastian',
        last_name: 'Gutierrez',
        avatar: 'https://i.pravatar.cc/150?img=21',
      },
      {
        first_name: 'Avery',
        last_name: 'Jimenez',
        avatar: 'https://i.pravatar.cc/150?img=22',
      },
    ],
    creators: [
      {
        first_name: 'Alexander',
        last_name: 'Ortiz',
        avatar: 'https://i.pravatar.cc/150?img=19',
      },
      {
        first_name: 'Ella',
        last_name: 'Reyes',
        avatar: 'https://i.pravatar.cc/150?img=20',
      },
    ],
    product_image: 'https://via.placeholder.com/150',
    product_url: 'https://via.placeholder.com/150',
  },
  {
    campaign_id: '7',
    campaign_name: 'Eco-Friendly Living',
    description:
      'Sustainable lifestyle content promoting our eco-friendly products',
    campaign_status: 'pending_approval',
    number_of_creators_wanted: 8,
    number_of_videos_wanted: 16,
    category: 'lifestyle',
    content_type: 'video',
    video_format: 'mp4',
    video_duration_in_seconds: 60,
    created_at: '2024-10-20T00:00:00Z',
    updated_at: '2024-12-05T00:00:00Z',
    brand_accepted: false,
    applications: [
      {
        first_name: 'Scarlett',
        last_name: 'Mendoza',
        avatar: 'https://i.pravatar.cc/150?img=23',
      },
      {
        first_name: 'Jackson',
        last_name: 'Vargas',
        avatar: 'https://i.pravatar.cc/150?img=24',
      },
    ],
    creators: [],
    product_image: 'https://via.placeholder.com/150',
    product_url: 'https://via.placeholder.com/150',
  },
  {
    campaign_id: '8',
    campaign_name: 'Gaming Highlights',
    description: 'Gaming content featuring our sponsored games and accessories',
    campaign_status: 'running',
    number_of_creators_wanted: 20,
    number_of_videos_wanted: 40,
    category: 'gaming',
    content_type: 'video',
    video_format: 'mp4',
    video_duration_in_seconds: 120,
    created_at: '2024-07-15T00:00:00Z',
    updated_at: '2024-12-16T00:00:00Z',
    brand_accepted: true,
    applications: [
      {
        first_name: 'Victoria',
        last_name: 'Castro',
        avatar: 'https://i.pravatar.cc/150?img=25',
      },
      {
        first_name: 'Daniel',
        last_name: 'Ruiz',
        avatar: 'https://i.pravatar.cc/150?img=26',
      },
      {
        first_name: 'Luna',
        last_name: 'Alvarez',
        avatar: 'https://i.pravatar.cc/150?img=27',
      },
      {
        first_name: 'Matthew',
        last_name: 'Romero',
        avatar: 'https://i.pravatar.cc/150?img=28',
      },
      {
        first_name: 'Grace',
        last_name: 'Diaz',
        avatar: 'https://i.pravatar.cc/150?img=29',
      },
      {
        first_name: 'David',
        last_name: 'Aguilar',
        avatar: 'https://i.pravatar.cc/150?img=30',
      },
      {
        first_name: 'Chloe',
        last_name: 'Medina',
        avatar: 'https://i.pravatar.cc/150?img=31',
      },
      {
        first_name: 'Joseph',
        last_name: 'Navarro',
        avatar: 'https://i.pravatar.cc/150?img=32',
      },
    ],
    creators: [
      {
        first_name: 'Victoria',
        last_name: 'Castro',
        avatar: 'https://i.pravatar.cc/150?img=25',
      },
      {
        first_name: 'Daniel',
        last_name: 'Ruiz',
        avatar: 'https://i.pravatar.cc/150?img=26',
      },
      {
        first_name: 'Luna',
        last_name: 'Alvarez',
        avatar: 'https://i.pravatar.cc/150?img=27',
      },
      {
        first_name: 'Matthew',
        last_name: 'Romero',
        avatar: 'https://i.pravatar.cc/150?img=28',
      },
      {
        first_name: 'Grace',
        last_name: 'Diaz',
        avatar: 'https://i.pravatar.cc/150?img=29',
      },
    ],
    product_image: 'https://via.placeholder.com/150',
    product_url: 'https://via.placeholder.com/150',
  },
  {
    campaign_id: '9',
    campaign_name: 'Food & Recipe Series',
    description: 'Delicious recipe content featuring our kitchen products',
    campaign_status: 'completed',
    number_of_creators_wanted: 5,
    number_of_videos_wanted: 10,
    category: 'food',
    content_type: 'video',
    video_format: 'mp4',
    video_duration_in_seconds: 60,
    created_at: '2024-04-01T00:00:00Z',
    updated_at: '2024-06-30T00:00:00Z',
    brand_accepted: true,
    applications: [
      {
        first_name: 'Zoey',
        last_name: 'Nunez',
        avatar: 'https://i.pravatar.cc/150?img=33',
      },
      {
        first_name: 'Samuel',
        last_name: 'Ramos',
        avatar: 'https://i.pravatar.cc/150?img=34',
      },
      {
        first_name: 'Lillian',
        last_name: 'Ortega',
        avatar: 'https://i.pravatar.cc/150?img=35',
      },
    ],
    creators: [
      {
        first_name: 'Zoey',
        last_name: 'Nunez',
        avatar: 'https://i.pravatar.cc/150?img=33',
      },
      {
        first_name: 'Samuel',
        last_name: 'Ramos',
        avatar: 'https://i.pravatar.cc/150?img=34',
      },
    ],
    product_image: 'https://via.placeholder.com/150',
    product_url: 'https://via.placeholder.com/150',
  },
  {
    campaign_id: '10',
    campaign_name: 'Travel Adventures',
    description: 'Travel vlogs showcasing destinations and our travel gear',
    campaign_status: 'running',
    number_of_creators_wanted: 12,
    number_of_videos_wanted: 24,
    category: 'travel',
    content_type: 'video',
    video_format: 'mp4',
    video_duration_in_seconds: 90,
    created_at: '2024-05-10T00:00:00Z',
    updated_at: '2024-12-12T00:00:00Z',
    brand_accepted: true,
    applications: [
      {
        first_name: 'Penelope',
        last_name: 'Silva',
        avatar: 'https://i.pravatar.cc/150?img=36',
      },
      {
        first_name: 'Jack',
        last_name: 'Herrera',
        avatar: 'https://i.pravatar.cc/150?img=37',
      },
      {
        first_name: 'Aria',
        last_name: 'Vazquez',
        avatar: 'https://i.pravatar.cc/150?img=38',
      },
      {
        first_name: 'Owen',
        last_name: 'Castillo',
        avatar: 'https://i.pravatar.cc/150?img=39',
      },
      {
        first_name: 'Riley',
        last_name: 'Santos',
        avatar: 'https://i.pravatar.cc/150?img=40',
      },
    ],
    creators: [
      {
        first_name: 'Penelope',
        last_name: 'Silva',
        avatar: 'https://i.pravatar.cc/150?img=36',
      },
      {
        first_name: 'Jack',
        last_name: 'Herrera',
        avatar: 'https://i.pravatar.cc/150?img=37',
      },
      {
        first_name: 'Aria',
        last_name: 'Vazquez',
        avatar: 'https://i.pravatar.cc/150?img=38',
      },
    ],
    product_image: 'https://via.placeholder.com/150',
    product_url: 'https://via.placeholder.com/150',
  },
  {
    campaign_id: '11',
    campaign_name: 'Pet Care Tips',
    description: 'Pet care and training content featuring our pet products',
    campaign_status: 'created',
    number_of_creators_wanted: 7,
    number_of_videos_wanted: 14,
    category: 'pets',
    content_type: 'video',
    video_format: 'mp4',
    video_duration_in_seconds: 45,
    created_at: '2024-11-01T00:00:00Z',
    updated_at: '2024-11-01T00:00:00Z',
    brand_accepted: false,
    applications: [
      {
        first_name: 'Layla',
        last_name: 'Pena',
        avatar: 'https://i.pravatar.cc/150?img=41',
      },
      {
        first_name: 'Carter',
        last_name: 'Fernandez',
        avatar: 'https://i.pravatar.cc/150?img=42',
      },
    ],
    creators: [],
    product_image: 'https://via.placeholder.com/150',
    product_url: 'https://via.placeholder.com/150',
  },
  {
    campaign_id: '12',
    campaign_name: 'DIY Home Decor',
    description: 'Creative DIY content for home decoration and organization',
    campaign_status: 'running',
    number_of_creators_wanted: 9,
    number_of_videos_wanted: 18,
    category: 'home',
    content_type: 'video',
    video_format: 'mp4',
    video_duration_in_seconds: 75,
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-12-14T00:00:00Z',
    brand_accepted: true,
    applications: [
      {
        first_name: 'Nora',
        last_name: 'Mendez',
        avatar: 'https://i.pravatar.cc/150?img=43',
      },
      {
        first_name: 'Wyatt',
        last_name: 'Moreno',
        avatar: 'https://i.pravatar.cc/150?img=44',
      },
      {
        first_name: 'Hannah',
        last_name: 'Campos',
        avatar: 'https://i.pravatar.cc/150?img=45',
      },
      {
        first_name: 'Julian',
        last_name: 'Delgado',
        avatar: 'https://i.pravatar.cc/150?img=46',
      },
    ],
    creators: [
      {
        first_name: 'Nora',
        last_name: 'Mendez',
        avatar: 'https://i.pravatar.cc/150?img=43',
      },
      {
        first_name: 'Wyatt',
        last_name: 'Moreno',
        avatar: 'https://i.pravatar.cc/150?img=44',
      },
      {
        first_name: 'Hannah',
        last_name: 'Campos',
        avatar: 'https://i.pravatar.cc/150?img=45',
      },
    ],
    product_image: 'https://via.placeholder.com/150',
    product_url: 'https://via.placeholder.com/150',
  },
];

const AvatarCollage = ({ people }: { people: Person[] }) => {
  return (
    <>
      {people?.map((person, index) => (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
          key={person.avatar}
        >
          <Tooltip>
            <TooltipTrigger>
              <Avatar className='border-2 border-white -ml-2'>
                <AvatarImage src={person.avatar} />
                <AvatarFallback>
                  {person.first_name[0]}
                  {person.last_name[0]}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <span className='font-regular'>
                {person.first_name} {person.last_name}
              </span>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      ))}
    </>
  );
};

export const columns: ColumnDef<ModelCampaign>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className={'mt-1'}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'campaign_name',
    accessorKey: 'campaign_name',
    cell: ({ row }) => <></>,
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => <></>,
  },
  {
    id: 'campaign_status',
    accessorKey: 'campaign_status',
    cell: ({ row }) => <></>,
    enableSorting: false,
    enableHiding: false,
    header: ({ column }) => <></>,
    filterFn: (row, id, filterValue) => {
      // If no filter is set, show all rows
      if (
        !filterValue ||
        !Array.isArray(filterValue) ||
        filterValue.length === 0
      ) {
        return true;
      }
      // Check if the row's status is in the filter array
      const rowValue = row.getValue(id) as string;
      return filterValue.includes(rowValue);
    },
  },
  {
    accessorKey: 'details',
    header: () => <span className='font-regular'>Details</span>,
    cell: ({ row }) => {
      const { campaign_name, description, campaign_status, updated_at } =
        row.original;
      return (
        <div>
          <h4 className='capitalize text-[18px] font-medium! text-primary'>
            {campaign_name}
          </h4>
          <p className='font-regular text-slate-500 mt-1 text-sm'>
            <span className='text-slate-800'>{description}</span>
            <br />
            <span>
              Last updated on{' '}
              {Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }).format(new Date(updated_at))}
            </span>
          </p>
          <p className='mt-4'>
            <span className='text-sm bg-accent rounded-full px-2 pb-1 font-regular text-slate-600 border border-primary-accent'>
              {campaign_status}
            </span>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'creators',
    header: () => <span className='font-regular'>Creators</span>,
    cell: ({ row }) => {
      const creators = row.getValue('creators') as Person[];
      return (
        <div className='flex'>
          <AnimatePresence>
            <AvatarCollage people={creators} />
          </AnimatePresence>
        </div>
      );
    },
  },
  {
    accessorKey: 'applications',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className='font-regular'>Applications</span>
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const applications = row.getValue('applications') as Person[];
      return (
        <div className='flex'>
          <AvatarCollage people={applications} />
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => (
      <div className='flex justify-end'>
        <span className='font-regular text-right'>Actions</span>
      </div>
    ),
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className='flex justify-end'>
          <ButtonGroup className='flex justify-end'>
            <Button variant='outline' size='sm' className='font-regular'>
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='font-regular'>
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className={'min-w-60 text-sm'}>
                <DropdownMenuItem className='text-sm'>
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem className='text-sm'>Rename</DropdownMenuItem>
                <DropdownMenuItem className='text-sm'>
                  Replicate
                </DropdownMenuItem>
                <DropdownMenuItem className='text-sm'>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </div>
      );
    },
  },
];

export function CampaignsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [searchValue, setSearchValue] = React.useState('');

  const statuses = React.useCallback(() => {
    const statusSet = new Set<string>();
    campaigns.map((campaign) => statusSet.add(campaign.campaign_status));

    return Array.from(statusSet);
  }, []);

  const table = useReactTable({
    data: campaigns,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      table.getColumn('campaign_name')?.setFilterValue(searchValue);
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div className='w-full px-5'>
      <div className='flex items-center justify-between py-4'>
        <SuperField
          type='search'
          placeholder='Search Campaign...'
          prefix={<HugeiconsIcon icon={SearchIcon} />}
          fieldClassName='placeholder:text-gray-400 font-regular'
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className='max-w-sm'
        />
        <div>
          <ButtonGroup>
            <ButtonGroup>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' size={'sm'}>
                    <HugeiconsIcon
                      icon={FilterHorizontalIcon}
                      className='text-sm'
                    />
                    <ChevronDown width={1} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className={'min-w-60'}>
                  <div
                    className='focus:bg-accent focus:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 relative flex cursor-default items-center outline-hidden select-none hover:bg-accent text-xs text-primary'
                    onClick={(e) => {
                      e.stopPropagation();
                      const column = table.getColumn('campaign_status');
                      if (!column) return;
                      column.setFilterValue(statuses());
                    }}
                  >
                    Select All
                  </div>
                  <DropdownMenuSeparator />
                  {statuses().map((status) => {
                    const filterValue = table
                      .getColumn('campaign_status')
                      ?.getFilterValue() as string[] | undefined;

                    return (
                      <DropdownMenuCheckboxItem
                        key={status}
                        className={cn('capitalize')}
                        checked={
                          Array.isArray(filterValue) &&
                          filterValue.includes(status)
                        }
                        onCheckedChange={(value) => {
                          const column = table.getColumn('campaign_status');
                          if (!column) return;

                          let currentStatuses =
                            (column.getFilterValue() as string[]) ?? [];

                          if (value) {
                            currentStatuses = [...currentStatuses, status];
                          } else {
                            currentStatuses = currentStatuses.filter(
                              (s) => s !== status
                            );
                          }

                          column.setFilterValue(
                            currentStatuses.length > 0
                              ? currentStatuses
                              : undefined
                          );
                        }}
                      >
                        {status}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
            <ButtonGroup className='text-slate-600'>
              <Button variant='outline' size={'icon-sm'}>
                <HugeiconsIcon icon={EyeIcon} className='text-sm' />
              </Button>
              <Button variant='outline' className={'p-0 '} size={'sm'}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      className='ml-auto font-regular text-sm '
                    >
                      Columns <ChevronDown width={1} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className={'min-w-60'}>
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        const shouldHide =
                          column.id === 'campaign_name' ||
                          column.id === 'campaign_status';
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className={cn('capitalize', { hidden: shouldHide })}
                            checked={shouldHide ? false : column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </Button>
            </ButtonGroup>
          </ButtonGroup>
        </div>
      </div>
      <div className='overflow-hidden'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <AnimatePresence mode='popLayout'>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <MotionTableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    layout
                    initial={{ opacity: 0, y: 20, borderColor: 'transparent' }}
                    animate={{ opacity: 1, y: 0, borderColor: 'inherit' }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.4,
                      delay: row.index * 0.05,
                      layout: { duration: 0.3 },
                    }}
                    className='bg-background'
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className='align-top py-4'>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </MotionTableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='text-muted-foreground flex-1 text-sm'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
