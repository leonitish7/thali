import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { BookingProvider } from './context/BookingContext';
import CartDrawer from './components/CartDrawer';
import BookingModal from './components/BookingModal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ChefSpotlight from './components/ChefSpotlight';
import MenuSection from './components/MenuSection';
import CateringEvents from './components/CateringEvents';
import Testimonials from './components/Testimonials';
import GiftCards from './components/GiftCards';
import Gallery from './components/Gallery';
import FAQAccordion from './components/FAQAccordion';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPortal from './pages/AdminPortal';
import { Analytics } from '@vercel/analytics/react';

function PublicApp() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar />
      <CartDrawer />
      <BookingModal />
      <main className="flex-grow">
        <Hero />
        <About />
        <ChefSpotlight />
        <MenuSection />
        <GiftCards />
        <CateringEvents />
        <Testimonials />
        <Gallery />
        <FAQAccordion />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <CartProvider>
        <Toaster position="bottom-center" />
        <Analytics />
        <Router>
          <Routes>
            <Route path="/" element={<PublicApp />} />
            <Route path="/admin" element={<AdminPortal />} />
          </Routes>
        </Router>
      </CartProvider>
    </BookingProvider>
  );
}
