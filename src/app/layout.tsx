import type { Metadata } from 'next';
import Providers from './providers';
import './globals.css';
import { AppNuqsAdapter } from './nuqs-adapter';
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata: Metadata = {
  title: 'Collect app',
  description: 'Collect frontend app',
};

export default function RootLayout({children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppNuqsAdapter>
            {children}
          </AppNuqsAdapter>
          </Providers>
      </body>
    </html>
  );
}

