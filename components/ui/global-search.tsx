'use client';

import { useAuth } from '@/lib/auth/auth-context';
import {
  ENTITIES_BY_ROLE,
  ENTITY_LABELS,
  useGlobalSearch,
  type EntityType,
  type SearchFilters,
  type SearchResult,
  type SearchGroup,
} from '@/lib/api/hooks/search';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/dashboard-ui/dialog';
import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { Input } from '@/components/dashboard-ui/input';
import { Separator } from '@/components/dashboard-ui/separator';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { InputGroupAddon } from '@/components/dashboard-ui/input-group';
import { Kbd, KbdGroup } from '@/components/dashboard-ui/kbd';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  SearchIcon,
  Store01Icon,
  ChartLineData01Icon,
  AiUserIcon,
  Task02Icon,
  FileScriptIcon,
  CreditCardAcceptIcon,
  FileUploadIcon,
  FilterHorizontalIcon,
  Cancel01Icon,
  ArrowRight01Icon,
  Calendar04Icon,
  Tick01Icon,
} from '@hugeicons/core-free-icons';
import { useRouter, useParams } from 'next/navigation';
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  useEffectEvent,
} from 'react';
import { cn } from '@/lib/dashboard-utils';
import { formatDate } from '@/lib/utils';

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ENTITY_ICONS: Record<EntityType, any> = {
  brands: Store01Icon,
  campaigns: ChartLineData01Icon,
  creators: AiUserIcon,
  gigs: Task02Icon,
  invoices: FileScriptIcon,
  payments: CreditCardAcceptIcon,
  submissions: FileUploadIcon,
};

// ─── Status options per entity type ──────────────────────────────────────────

const STATUS_OPTIONS: Record<EntityType, { value: string; label: string }[]> = {
  brands: [
    { value: 'created', label: 'Created' },
    { value: 'pending_approval', label: 'Pending Approval' },
    { value: 'approved', label: 'Approved' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'deleted', label: 'Deleted' },
  ],
  campaigns: [
    { value: 'draft', label: 'Draft' },
    { value: 'pending_approval', label: 'Pending Approval' },
    { value: 'returned', label: 'Returned' },
    { value: 'gigs_approved', label: 'Gigs Approved' },
    { value: 'running', label: 'Running' },
    { value: 'completed', label: 'Completed' },
    { value: 'deactivated', label: 'Deactivated' },
  ],
  creators: [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'rejected', label: 'Rejected' },
  ],
  gigs: [
    { value: 'draft', label: 'Draft' },
    { value: 'pending_approval', label: 'Pending Approval' },
    { value: 'running', label: 'Running' },
    { value: 'completed', label: 'Completed' },
    { value: 'deactivated', label: 'Deactivated' },
  ],
  invoices: [
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'cancelled', label: 'Cancelled' },
  ],
  payments: [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' },
  ],
  submissions: [
    { value: 'created', label: 'Created' },
    { value: 'pending_approval', label: 'Pending Approval' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'returned', label: 'Returned' },
  ],
};

// ─── Navigation URL builder ───────────────────────────────────────────────────

function buildUrl(
  locale: string,
  role: 'admin' | 'brand' | 'creator',
  result: SearchResult,
): string {
  const base = `/${locale}`;
  const { type, id, meta } = result;

  if (role === 'admin') {
    switch (type) {
      case 'brands':
        return `${base}/admin/brands/${id}`;
      case 'campaigns':
        return `${base}/admin/campaigns/${id}`;
      case 'creators':
        return `${base}/admin/creators/${id}`;
      case 'gigs':
        return `${base}/admin/gigs`;
      case 'invoices':
        return `${base}/admin/invoices`;
      case 'payments':
        return `${base}/admin/payouts`;
      case 'submissions':
        return meta?.campaignId
          ? `${base}/admin/campaigns/${meta.campaignId}`
          : `${base}/admin/campaigns`;
    }
  }

  if (role === 'brand') {
    switch (type) {
      case 'campaigns':
        return `${base}/brand/campaigns/${id}`;
      case 'creators':
        return `${base}/brand/creators`;
      case 'gigs':
        return `${base}/brand/gigs`;
      case 'submissions':
        return meta?.campaignId
          ? `${base}/brand/campaigns/${meta.campaignId}`
          : `${base}/brand/campaigns`;
      case 'invoices':
        return `${base}/brand/invoices`;
      case 'payments':
        return `${base}/brand/payments`;
    }
  }

  if (role === 'creator') {
    switch (type) {
      case 'gigs':
        return `${base}/creator/gigs`;
      case 'submissions':
        return `${base}/creator/my-gigs`;
      case 'payments':
        return `${base}/creator/earnings`;
    }
  }

  return '#';
}

// ─── Status badge color map ───────────────────────────────────────────────────

function getStatusVariant(status?: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (!status) return 'outline';
  const s = status.toLowerCase();
  if (s.includes('approved') || s.includes('completed') || s.includes('paid') || s.includes('accepted') || s.includes('running')) return 'default';
  if (s.includes('pending') || s.includes('processing') || s.includes('draft')) return 'secondary';
  if (s.includes('rejected') || s.includes('suspended') || s.includes('deactivated') || s.includes('failed') || s.includes('deleted')) return 'destructive';
  return 'outline';
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function EntityChip({
  type,
  active,
  onToggle,
}: {
  type: EntityType;
  active: boolean;
  onToggle: (type: EntityType) => void;
}) {
  return (
    <button
      onClick={() => onToggle(type)}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors shrink-0',
        active
          ? 'bg-foreground text-background border-foreground'
          : 'bg-background text-muted-foreground border-input hover:border-foreground hover:text-foreground',
      )}
    >
      <HugeiconsIcon icon={ENTITY_ICONS[type]} className="size-3" strokeWidth={2} />
      {ENTITY_LABELS[type]}
    </button>
  );
}

function SearchResultRow({
  result,
  onSelect,
}: {
  result: SearchResult;
  onSelect: (result: SearchResult) => void;
}) {
  return (
    <button
      onClick={() => onSelect(result)}
      className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <HugeiconsIcon
          icon={ENTITY_ICONS[result.type]}
          className="size-4 text-muted-foreground"
          strokeWidth={2}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{result.title}</p>
        {result.subtitle && (
          <p className="truncate text-xs text-muted-foreground">{result.subtitle}</p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {result.tags?.map((tag) => (
          <span key={tag.label} className="text-xs text-muted-foreground">
            {tag.value}
          </span>
        ))}
        {result.status && (
          <Badge variant={getStatusVariant(result.status)} className="text-[10px]!">
            {result.status.replace(/_/g, ' ')}
          </Badge>
        )}
        {result.createdAt && (
          <span className="hidden text-xs text-muted-foreground sm:block">
            {formatDate(result.createdAt)}
          </span>
        )}
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          strokeWidth={2}
        />
      </div>
    </button>
  );
}

function ResultGroup({
  group,
  onSelect,
}: {
  group: SearchGroup;
  onSelect: (result: SearchResult) => void;
}) {
  if (group.isLoading) {
    return (
      <div className="px-2">
        <p className="mb-1.5 px-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {ENTITY_LABELS[group.type]}
        </p>
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5">
            <Skeleton className="size-8 rounded-md" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-3/5 rounded" />
              <Skeleton className="h-2.5 w-2/5 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (group.items.length === 0) return null;

  return (
    <div className="px-2">
      <p className="mb-1 px-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
        {ENTITY_LABELS[group.type]}
      </p>
      {group.items.map((item) => (
        <SearchResultRow key={item.id} result={item} onSelect={onSelect} />
      ))}
    </div>
  );
}

// ─── Advanced Filters Panel ───────────────────────────────────────────────────

function AdvancedFilters({
  filters,
  onChange,
  entityTypes,
}: {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  entityTypes: Set<EntityType>;
}) {
  // Collect status options from selected entity types
  const statusOptions = Array.from(entityTypes).flatMap((t) => STATUS_OPTIONS[t] ?? []);
  const uniqueStatuses = Array.from(
    new Map(statusOptions.map((s) => [s.value, s])).values(),
  );

  return (
    <div className="border-t border-border bg-muted/30 px-4 py-3">
      <div className="flex flex-wrap items-end gap-3">
        {/* Date after */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
            After
          </label>
          <div className="relative">
            <HugeiconsIcon
              icon={Calendar04Icon}
              className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none"
              strokeWidth={2}
            />
            <Input
              type="date"
              value={filters.createdAfter ?? ''}
              onChange={(e) => onChange({ ...filters, createdAfter: e.target.value || undefined })}
              className="h-8 w-36 pl-7 text-xs"
            />
          </div>
        </div>

        {/* Date before */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
            Before
          </label>
          <div className="relative">
            <HugeiconsIcon
              icon={Calendar04Icon}
              className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none"
              strokeWidth={2}
            />
            <Input
              type="date"
              value={filters.createdBefore ?? ''}
              onChange={(e) => onChange({ ...filters, createdBefore: e.target.value || undefined })}
              className="h-8 w-36 pl-7 text-xs"
            />
          </div>
        </div>

        {/* Status */}
        {uniqueStatuses.length > 0 && (
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
              Status
            </label>
            <select
              value={filters.status ?? ''}
              onChange={(e) => onChange({ ...filters, status: e.target.value || undefined })}
              className="h-8 rounded-md border border-input bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="">Any status</option>
              {uniqueStatuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Clear filters */}
        {(filters.createdAfter || filters.createdBefore || filters.status) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange({})}
            className="h-8 text-xs text-muted-foreground"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-3 mr-1" strokeWidth={2} />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── Search Dialog ────────────────────────────────────────────────────────────

function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? 'en';
  const role = (user?.role ?? 'admin') as 'admin' | 'brand' | 'creator';

  const availableEntities = ENTITIES_BY_ROLE[role] ?? [];

  // ── State ──────────────────────────────────────────────────────────────────
  const [inputValue, setInputValue] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedEntities, setSelectedEntities] = useState<Set<EntityType>>(
    new Set(availableEntities),
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(inputValue), 350);
    return () => clearTimeout(timer);
  }, [inputValue]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setInputValue('');
      setDebouncedQuery('');
      setFilters({});
      setShowAdvanced(false);
    }
  }, [open]);

  // Toggle entity type
  const toggleEntity = useCallback((type: EntityType) => {
    setSelectedEntities((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        if (next.size === 1) return prev; // keep at least one
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  }, []);

  const selectAllEntities = () => setSelectedEntities(new Set(availableEntities));
  const allSelected = selectedEntities.size === availableEntities.length;

  // Search
  const { groups, isAnyLoading, hasResults } = useGlobalSearch({
    role,
    query: debouncedQuery,
    entityTypes: selectedEntities,
    filters,
    enabled: open,
  });

  const hasActiveFilters = !!(filters.createdAfter || filters.createdBefore || filters.status);

  // Navigate on select
  const handleSelect = useCallback(
    (result: SearchResult) => {
      const url = buildUrl(locale, role, result);
      onOpenChange(false);
      router.push(url);
    },
    [locale, role, onOpenChange, router],
  );

  const showEmpty = debouncedQuery.length >= 2 && !isAnyLoading && !hasResults;
  const showHint = debouncedQuery.length < 2 && !isAnyLoading;
  const showResults = debouncedQuery.length >= 2;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogHeader className="sr-only">
        <DialogTitle>Global Search</DialogTitle>
        <DialogDescription>Search across your dashboard</DialogDescription>
      </DialogHeader>
      <DialogContent className="max-w-2xl! overflow-hidden p-0 rounded-xl!">
        {/* ── Search Input ── */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <HugeiconsIcon
            icon={SearchIcon}
            className="size-4 shrink-0 text-muted-foreground"
            strokeWidth={2}
          />
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search campaigns, creators, gigs…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {inputValue && (
            <button
              onClick={() => setInputValue('')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="size-4" strokeWidth={2} />
            </button>
          )}
          {isAnyLoading && (
            <div className="size-4 animate-spin rounded-full border-2 border-muted border-t-foreground shrink-0" />
          )}
        </div>

        {/* ── Entity Type Filter Chips ── */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 overflow-x-auto no-scrollbar">
          {/* All toggle */}
          <button
            onClick={allSelected ? () => {} : selectAllEntities}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors shrink-0',
              allSelected
                ? 'bg-foreground text-background border-foreground'
                : 'bg-background text-muted-foreground border-input hover:border-foreground hover:text-foreground',
            )}
          >
            {allSelected && <HugeiconsIcon icon={Tick01Icon} className="size-3" strokeWidth={2} />}
            All
          </button>
          <div className="h-4 w-px bg-border shrink-0" />
          {availableEntities.map((type) => (
            <EntityChip
              key={type}
              type={type}
              active={selectedEntities.has(type) && !allSelected}
              onToggle={toggleEntity}
            />
          ))}
          <div className="ml-auto shrink-0">
            <button
              onClick={() => setShowAdvanced((v) => !v)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors',
                showAdvanced || hasActiveFilters
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-background text-muted-foreground border-input hover:border-foreground hover:text-foreground',
              )}
            >
              <HugeiconsIcon icon={FilterHorizontalIcon} className="size-3" strokeWidth={2} />
              Filters
              {hasActiveFilters && (
                <span className="flex size-4 items-center justify-center rounded-full bg-background text-foreground text-[9px] font-bold">
                  {[filters.createdAfter, filters.createdBefore, filters.status].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Advanced Filters ── */}
        {showAdvanced && (
          <AdvancedFilters
            filters={filters}
            onChange={setFilters}
            entityTypes={selectedEntities}
          />
        )}

        {/* ── Results ── */}
        <ScrollArea className="max-h-[460px]">
          <div className="py-2">
            {/* Hint state */}
            {showHint && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                  <HugeiconsIcon icon={SearchIcon} className="size-5 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-foreground">Search across your dashboard</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Type at least 2 characters to search{' '}
                  {Array.from(selectedEntities)
                    .map((t) => ENTITY_LABELS[t].toLowerCase())
                    .join(', ')}
                </p>
              </div>
            )}

            {/* Empty state */}
            {showEmpty && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                  <HugeiconsIcon icon={SearchIcon} className="size-5 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-foreground">No results for "{debouncedQuery}"</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try a different search term or adjust your filters
                </p>
              </div>
            )}

            {/* Result groups */}
            {showResults && (
              <div className="space-y-3">
                {groups.map((group, i) => (
                  <div key={group.type}>
                    <ResultGroup group={group} onSelect={handleSelect} />
                    {i < groups.length - 1 &&
                      (group.isLoading || group.items.length > 0) &&
                      (groups[i + 1]?.isLoading || groups[i + 1]?.items.length > 0) && (
                        <Separator className="mx-4 mt-3 w-auto" />
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2">
          <p className="text-[11px] text-muted-foreground">
            {showResults && hasResults
              ? `Showing top ${groups.reduce((sum, g) => sum + g.items.length, 0)} results`
              : 'Press Enter to search'}
          </p>
          <div className="flex items-center gap-2">
            <KbdGroup>
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
            </KbdGroup>
            <span className="text-[11px] text-muted-foreground">navigate</span>
            <KbdGroup>
              <Kbd>↵</Kbd>
            </KbdGroup>
            <span className="text-[11px] text-muted-foreground">select</span>
            <KbdGroup>
              <Kbd>Esc</Kbd>
            </KbdGroup>
            <span className="text-[11px] text-muted-foreground">close</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

export function GlobalSearch() {
  const [open, setOpen] = useState(false);

  const shortCutEvent = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => shortCutEvent(e);
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const ShortcutBtn = (
    <InputGroupAddon align="inline-end">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </InputGroupAddon>
  );

  const handleClick = () => setOpen(true);
  const handleKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'Enter') handleClick();
  };

  return (
    <>
      <SuperField
        type="search"
        placeholder="Search..."
        prefix={<HugeiconsIcon icon={SearchIcon} />}
        suffix={ShortcutBtn}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="max-w-xl self-center"
        readOnly
        fieldClassName="placeholder:text-gray-400 cursor-pointer"
      />
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
