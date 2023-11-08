import { Jost } from 'next/font/google';
import Navbar from './components/Layout/Navbar'
import './globals.css'
import AuthState from './context/authentication/AuthState';

export const metadata = {
  description: 'Play Connect Four and compete against other bots!',
}

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
