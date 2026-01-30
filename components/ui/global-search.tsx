import { SearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { KeyboardEvent as ReactKeyboardEvent, useEffect, useEffectEvent, useState } from "react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../dashboard-ui/command";
import { InputGroupAddon } from "../dashboard-ui/input-group";
import { Kbd, KbdGroup } from "../dashboard-ui/kbd";
import { SuperField } from "../dashboard-ui/super-field";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  searchValue: string;
  onSearchValueChange: ( value: string ) => void;
}

function SearchDialog( { open, onOpenChange, searchValue, onSearchValueChange }: SearchDialogProps ) {
  return (
    <CommandDialog open={ open } onOpenChange={ onOpenChange } modal={ true } title="Search" className="max-w-[700px]!">
      <Command>
        <CommandInput placeholder="Type a command or search..." value={ searchValue } onValueChange={ onSearchValueChange } />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}

export function GlobalSearch() {
  const [ open, setOpen ] = useState( false );
  const [ searchValue, setSearchValue ] = useState( "" );

  const shortCutEvent = useEffectEvent( ( e: KeyboardEvent ) => {
    if ( e.key === "k" && ( e.metaKey || e.ctrlKey ) ) {
      e.preventDefault();
      setOpen( ( open ) => !open );
    }
  } );

  // Using native KeyboardEvent for the document listener
  useEffect( () => {
    const down = ( e: KeyboardEvent ) => {
      shortCutEvent( e );
    };

    document.addEventListener( "keydown", down );
    return () => document.removeEventListener( "keydown", down );
  }, [] );

  const ShortcutBtn = ( <InputGroupAddon align='inline-end'>
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  </InputGroupAddon> );

  const handleClick = () => setOpen( true );
  const handleKeyDown = ( e: ReactKeyboardEvent ) => { if ( e.key === 'Enter' ) handleClick(); };

  return (
    <>
      <SuperField type="search" placeholder="Search..." prefix={ <HugeiconsIcon icon={ SearchIcon } /> } suffix={ ShortcutBtn } onClick={ handleClick } onKeyDown={ handleKeyDown } className="max-w-xl self-center" value={ searchValue } onValueChange={ setSearchValue } fieldClassName="placeholder:text-gray-400" />
      <SearchDialog open={ open } onOpenChange={ setOpen } searchValue={ searchValue } onSearchValueChange={ setSearchValue } />
    </>
  );
}
