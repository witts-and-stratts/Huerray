'use client';

import Image from 'next/image';
import { useState, useTransition, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

const languages = [
  { value: 'en', label: 'English', flag: '/images/flags/uk.svg' },
  { value: 'de', label: 'Deutsch', flag: '/images/flags/germany.svg' },
  { value: 'fr', label: 'Français', flag: '/images/flags/france.svg' },
  { value: 'es', label: 'Español', flag: '/images/flags/spain.svg' },
];

interface LanguageSelectorProps {
  showLabel?: boolean;
}

export function LanguageSelector({ showLabel = true }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const popoverRef = useRef<HTMLDivElement>(null);

  // Force hide popover when navigating
  useEffect(() => {
    if (isNavigating) {
      const portal = document.querySelector('[data-radix-popper-content-wrapper]');
      if (portal) {
        (portal as HTMLElement).style.display = 'none';
      }
    }
  }, [isNavigating]);

  // Reset navigating state when popover is opened
  useEffect(() => {
    if (open) {
      setIsNavigating(false);
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <button className='language-selector' aria-label='Select language'>
          <div className='flex gap-2'>
            <Image
              src={languages.find((lang) => lang.value === locale)?.flag || ''}
              alt=''
              width={19}
              height={19}
              className='language-selector__flag'
            />
            {showLabel && (
              <span className='language-selector__label'>
                {languages.find((lang) => lang.value === locale)?.label}
              </span>
            )}
          </div>
          <span className='icon icon-chevron-thin-down language-selector__chevron'></span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        ref={popoverRef}
        className='language-selector__dropdown'
        align='end'
        style={isNavigating ? { display: 'none' } : undefined}
      >
        <Command>
          {/* <CommandInput placeholder='Search language...' /> */}
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(currentValue) => {
                    setIsNavigating(true);
                    setOpen(false);
                    setTimeout(() => {
                      startTransition(() => {
                        // Remove the current locale from pathname if it exists
                        const pathnameWithoutLocale =
                          pathname.replace(`/${locale}`, '') || '/';
                        // Navigate to the new locale
                        router.push(`/${currentValue}${pathnameWithoutLocale}`);
                      });
                    }, 50);
                  }}
                  className='language-selector__dropdown-item'
                >
                  <span className='language-selector__option'>
                    <Image
                      src={language.flag}
                      alt=''
                      width={19}
                      height={19}
                      className='language-selector__flag'
                    />
                    <span>{language.label}</span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
