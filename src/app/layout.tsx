import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from '@/components/ui/Navbar';
const inter = Inter({ subsets: ['latin'] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}