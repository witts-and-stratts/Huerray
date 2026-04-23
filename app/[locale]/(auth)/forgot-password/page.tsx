import type { Metadata } from "next";
import Image from "next/image";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { LanguageSelector } from "@/components/LanguageSelector";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <div className="grid md:grid-cols-2">
      <div className="col-span-1 max-md:hidden relative">
        <Image src="/images/content/lifestyle-9.webp" alt="Product Image" width={ 1920 } height={ 1080 } className="object-cover h-full fixed w-1/2" />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-burgundy-50 p-4">
        <div className="absolute top-4 right-4">
          <LanguageSelector showLabel={ false } />
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
