import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BusPassProvider } from './context/BusPassContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bus Pass Portal - St. Joseph\'s College of Engineering and Technology',
  description: 'Digital bus pass issuance system for St. Joseph\'s College students',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BusPassProvider>
          {children}
        </BusPassProvider>
      </body>
    </html>
  );
}