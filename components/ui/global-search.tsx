import { useEffect, useState } from "react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../dashboard-ui/command";
import { Field } from "../dashboard-ui/field";
import { Input } from "../dashboard-ui/input";
import { Kbd, KbdGroup } from "../dashboard-ui/kbd";
import { InputGroup, InputGroupAddon } from "../dashboard-ui/input-group";
import { InputGroupInput } from "./input-group";

export function GlobalSearch() {
  const [ open, setOpen ] = useState( false );


  // Toggle command dialog with Cmd+K
  useEffect( () => {
    const down = ( e: KeyboardEvent ) => {
      if ( e.key === "k" && ( e.metaKey || e.ctrlKey ) ) {
        e.preventDefault();
        setOpen( ( open ) => !open );
      }
    };
    document.addEventListener( "keydown", down );
    return () => document.removeEventListener( "keydown", down );
  }, [] );

  return (
    <>
      <InputGroup className="relative flex flex-row w-full max-w-140 pr-2">
        <InputGroupInput
          type="search"
          placeholder="Search..."
          className="border-none focus-visible:ring-0 shadow-none grow w-full"
          onClick={ () => setOpen( true ) }
          onKeyDown={ e => { if ( e.key === 'Enter' ) setOpen( true ); } }
        />
        <InputGroupAddon align='inline-end'>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </InputGroupAddon>
      </InputGroup>
      <CommandDialog open={ open } onOpenChange={ setOpen } modal={ true } title="Search" className="max-w-[700px]!">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
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
    </>
  );
}

