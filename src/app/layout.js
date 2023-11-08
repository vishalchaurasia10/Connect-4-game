'use client'
import { Jost } from 'next/font/google';
import Navbar from './components/Layout/Navbar'
import './globals.css'
import AuthState from './context/authentication/AuthState';
import { usePathname } from 'next/navigation';

const jost = Jost({
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isExcludedPage = pathname === '/admin';

  return (
    <html lang="en">
      <body className={`${jost.className}`} >
        {isExcludedPage ? (
          <>
            <Navbar />
            {children}
          </>
        ) : (
          <AuthState>
            <Navbar />
            {children}
          </AuthState>
        )}
      </body>
    </html>
  )
}
