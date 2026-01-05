import { Button } from '@/components/dashboard-ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/dashboard-ui/dialog';
import { Separator } from '@/components/dashboard-ui/separator';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { useState } from 'react';
import { toast } from 'sonner';

interface ImportUrlDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  onImport: ( url: string ) => void;
}

export function ImportUrlDialog( { open, onOpenChange, onImport }: ImportUrlDialogProps ) {
  const [ importUrl, setImportUrl ] = useState( '' );

  const handleImport = () => {
    if ( !importUrl ) return;

    try {
      new URL( importUrl ); // Validate URL
      onImport( importUrl );
      setImportUrl( '' );
      onOpenChange( false );
    } catch ( e ) {
      toast.error( 'Please enter a valid URL' );
    }
  };

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent className="w-[800px] lg:max-w-none! p-0">
        <DialogHeader className='px-4 pt-4 -mb-3'>
          <DialogTitle className='text-lg font-primary font-normal'>
            Import URL
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="grid gap-4 py-4 px-8">
          <div className="grid w-full gap-1.5">
            <SuperField
              type='url'
              name='importUrl'
              label='Import a file from a URL:'
              onChange={ ( e ) => setImportUrl( e.target.value ) }
              value={ importUrl }
              placeholder="https://..."
              onKeyDown={ ( e ) => {
                if ( e.key === 'Enter' ) {
                  handleImport();
                }
              } }
              fieldClassName='h-10'
              labelClassName='font-[350] -mb-1 text-muted-foreground/78'
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start p-8 pt-0">
          <Button type="button" onClick={ handleImport } className='min-w-25'>
            Import
          </Button>
          <Button type="button" variant="secondary" onClick={ () => onOpenChange( false ) } className='min-w-25'>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
