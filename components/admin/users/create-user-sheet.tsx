"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateUser } from "@/lib/api/hooks/users";
import { Button } from "@/components/dashboard-ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/dashboard-ui/sheet";
import { SuperField } from "@/components/dashboard-ui/super-field";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

interface CreateUserSheetProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export function CreateUserSheet( { open, onOpenChange }: CreateUserSheetProps ) {
  const createUser = useCreateUser();
  const t = useTranslations( 'dashboard.admin.createUser' );
  const tc = useTranslations( 'dashboard.common' );

  const createUserSchema = z.object( {
    first_name: z.string().min( 1, t( 'validation.firstNameRequired' ) ),
    last_name: z.string().min( 1, t( 'validation.lastNameRequired' ) ),
    username: z.string().min( 3, t( 'validation.usernameMin' ) ),
    email: z.string().email( t( 'validation.invalidEmail' ) ),
    password: z.string().min( 8, t( 'validation.passwordMin' ) ),
    verify_password: z.string().min( 8, t( 'validation.verifyPasswordMin' ) ),
  } ).refine( ( data ) => data.password === data.verify_password, {
    message: t( 'validation.passwordsMismatch' ),
    path: [ "verify_password" ],
  } );

  type CreateUserFormValues = z.infer<typeof createUserSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormValues>( {
    resolver: zodResolver( createUserSchema ),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      verify_password: "",
    },
  } );

  // Reset form when sheet closes
  useEffect( () => {
    if ( !open ) {
      reset();
    }
  }, [ open, reset ] );

  const onSubmit = ( data: CreateUserFormValues ) => {
    createUser.mutate( data, {
      onSuccess: () => {
        toast.success( t( 'successToast' ) );
        onOpenChange( false );
      },
      onError: ( error ) => {
        toast.error( t( 'errorToast' ) );
        console.error( error );
      },
    } );
  };

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange }>
      <SheetContent className="w-[90%]! max-w-[520px]! flex flex-col overflow-hidden p-0!">
        <SheetHeader className="px-6 pt-6 pb-4 shrink-0 border-b bg-background/80">
          <SheetTitle className="dialog__title text-primary">{ t( 'title' ) }</SheetTitle>
          <SheetDescription className="text-base">
            { t( 'description' ) }
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={ handleSubmit( onSubmit ) } className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <SuperField
                type="text"
                label={ t( 'firstNameLabel' ) }
                placeholder={ t( 'firstNamePlaceholder' ) }
                { ...register( "first_name" ) }
                error={ errors.first_name?.message }
              />
              <SuperField
                type="text"
                label={ t( 'lastNameLabel' ) }
                placeholder={ t( 'lastNamePlaceholder' ) }
                { ...register( "last_name" ) }
                error={ errors.last_name?.message }
              />
            </div>

            <SuperField
              type="text"
              label={ t( 'usernameLabel' ) }
              placeholder={ t( 'usernamePlaceholder' ) }
              { ...register( "username" ) }
              error={ errors.username?.message }
            />

            <SuperField
              type="email"
              label={ t( 'emailLabel' ) }
              placeholder={ t( 'emailPlaceholder' ) }
              { ...register( "email" ) }
              error={ errors.email?.message }
            />

            <div className="grid grid-cols-2 gap-4">
              <SuperField
                type="password"
                label={ t( 'passwordLabel' ) }
                placeholder="********"
                { ...register( "password" ) }
                error={ errors.password?.message }
              />
              <SuperField
                type="password"
                label={ t( 'verifyPasswordLabel' ) }
                placeholder="********"
                { ...register( "verify_password" ) }
                error={ errors.verify_password?.message }
              />
            </div>
          </div>

          <div className="shrink-0 border-t px-6 py-4 flex items-center justify-end gap-3 bg-background">
            <Button type="button" variant="outline" onClick={ () => onOpenChange( false ) }>
              { tc( 'cancel' ) }
            </Button>
            <Button type="submit" disabled={ isSubmitting || createUser.isPending } className="min-w-[100px]">
              { createUser.isPending ? <Loader2 className="size-4 animate-spin" /> : t( 'create' ) }
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
