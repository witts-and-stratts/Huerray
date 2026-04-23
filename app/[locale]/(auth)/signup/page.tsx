import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";
import { LanguageSelector } from "@/components/LanguageSelector";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <div className="grid md:grid-cols-2">
      <div className="col-span-1 max-md:hidden relative">
        <Image src="/images/content/lifestyle-4.webp" alt="Product Image" width={ 1920 } height={ 1080 } className="object-cover h-full fixed w-1/2" />
      </div>
      <div className="flex min-h-screen items-center justify-center bg-burgundy-50 p-4">
        <div className="absolute top-4 right-4 z-300">
          <LanguageSelector showLabel={ false } /></div>
        <SignupForm />
      </div>
    </div>
  );
}
