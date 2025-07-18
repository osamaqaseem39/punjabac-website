import './globals.css';
import '../styles/punjabac-colors.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';

export const metadata = {
  title: 'Punjab Car AC | Auto Air Conditioning Experts',
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
