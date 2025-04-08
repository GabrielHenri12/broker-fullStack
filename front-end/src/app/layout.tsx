import { Inter } from 'next/font/google';
import { Provider } from '@/components/provider';
import Header from '@/components/Header';
import { AuthProvider, AuthConsumer } from '../auth/context';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <body>
        <Provider>
          <AuthProvider>
            <AuthConsumer>
              <Header />
              {children}
            </AuthConsumer>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
