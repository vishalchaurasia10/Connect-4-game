'use client'
import { Jost } from 'next/font/google';
import Navbar from './components/Layout/Navbar'
import './globals.css'
import AuthState from './context/authentication/AuthState';

const jost = Jost({
  subsets: ['latin'],
});

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${jost.className}`} >
        <AuthState>
          <Navbar />
          {children}
        </AuthState>
      </body>
    </html>
  )
}
