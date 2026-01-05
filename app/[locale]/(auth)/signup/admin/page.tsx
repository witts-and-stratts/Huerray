import { SignupForm } from "@/components/auth/signup-form";
import { LanguageSelector } from "@/components/LanguageSelector";
import Image from "next/image";

export default function AdminSignupPage() {
  return (
    <div className="grid md:grid-cols-2">
      <div className="col-span-1 max-md:hidden">
        <Image
          src="/images/content/lifestyle-7.webp"
          alt="Product Image"
          width={ 1920 }
          height={ 1080 }
          className="object-cover w-full h-full"
        />
      </div>
      <div className="col-span-1 flex min-h-screen items-center justify-center bg-burgundy-50 p-4 relative">
        <div className="absolute top-4 right-4 z-300">
          <LanguageSelector showLabel={ false } />
        </div>
        <SignupForm initialRole="admin" />
      </div>
    </div>
  );
}
