import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollProgressBar from '../ui/ScrollProgressBar';

// Wraps every public page (Home, Works, Work Detail, Services, Contact) with
// the shared header/footer chrome.
export default function Layout() {
  return (
    <>
      <ScrollProgressBar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
