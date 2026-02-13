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
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/dashboard-ui/field";
import { Input } from "@/components/dashboard-ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const createUserSchema = z.object( {
  first_name: z.string().min( 1, "First name is required" ),
  last_name: z.string().min( 1, "Last name is required" ),
  username: z.string().min( 3, "Username must be at least 3 characters" ),
  email: z.string().email( "Invalid email address" ),
  password: z.string().min( 8, "Password must be at least 8 characters" ),
  verify_password: z.string().min( 8, "Verify password must be at least 8 characters" ),
} ).refine( ( data ) => data.password === data.verify_password, {
  message: "Passwords do not match",
  path: [ "verify_password" ],
} );

type CreateUserFormValues = z.infer<typeof createUserSchema>;

interface CreateUserSheetProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export function CreateUserSheet( { open, onOpenChange }: CreateUserSheetProps ) {
  const createUser = useCreateUser();

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
        toast.success( "User created successfully" );
        onOpenChange( false );
      },
      onError: ( error ) => {
        toast.error( "Failed to create user" );
        console.error( error );
      },
    } );
  };

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange }>
      <SheetContent className="sm:max-w-[500px] bg-white">
        <SheetHeader>
          <SheetTitle>Add User</SheetTitle>
          <SheetDescription>
            Create a new user account. Fill in the details below.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={ handleSubmit( onSubmit ) } className="space-y-6 mt-6">
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>First Name</FieldLabel>
                <Input placeholder="John" { ...register( "first_name" ) } />
                <FieldError errors={ [ { message: errors.first_name?.message } ] } />
              </Field>
              <Field>
                <FieldLabel>Last Name</FieldLabel>
                <Input placeholder="Doe" { ...register( "last_name" ) } />
                <FieldError errors={ [ { message: errors.last_name?.message } ] } />
              </Field>
            </div>

            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input placeholder="johndoe" { ...register( "username" ) } />
              <FieldError errors={ [ { message: errors.username?.message } ] } />
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input placeholder="john@example.com" type="email" { ...register( "email" ) } />
              <FieldError errors={ [ { message: errors.email?.message } ] } />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input type="password" placeholder="********" { ...register( "password" ) } />
                <FieldError errors={ [ { message: errors.password?.message } ] } />
              </Field>
              <Field>
                <FieldLabel>Verify Password</FieldLabel>
                <Input type="password" placeholder="********" { ...register( "verify_password" ) } />
                <FieldError errors={ [ { message: errors.verify_password?.message } ] } />
              </Field>
            </div>
          </FieldGroup>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={ () => onOpenChange( false ) }>
              Cancel
            </Button>
            <Button type="submit" disabled={ isSubmitting || createUser.isPending } className="min-w-[100px]">
              { createUser.isPending ? <Loader2 className="size-4 animate-spin" /> : "Create User" }
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
