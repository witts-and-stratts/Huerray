// This file bypasses the app's normal rendering (see next.config.ts
// experimental.globalNotFound) because there is no single root layout to
// compose a global 404 from — (website), (auth) and (admin) each render
// their own full <html>/<body> independently. It must therefore import its
// own styles/fonts and can't rely on next-intl locale context, so the copy
// here is English-only; links go through `/` which redirects to the
// visitor's detected locale.
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter( { subsets: [ 'latin' ] } );

export const metadata: Metadata = {
  title: 'Page not found | Huerray',
  description: "The page you're looking for may have been moved or no longer exists.",
};

export default function GlobalNotFound() {
  return (
    <html lang='en' className={ inter.className }>
      <body>
        <main className='min-h-screen flex flex-col items-center justify-center text-center px-4 py-32'>
          <p className='text-h1 font-heading gradient-text mb-4'>404</p>
          <h1 className='text-h3 font-heading mb-4'>This page doesn&apos;t exist</h1>
          <p className='text-h6 text-slate-700 max-w-[520px] mx-auto mb-10'>
            The page you&apos;re looking for may have been moved or no longer exists.
          </p>
          <a href='/' className='button button--gradient button--size-xl'>
            Back to homepage
          </a>
        </main>
      </body>
    </html>
  );
}
