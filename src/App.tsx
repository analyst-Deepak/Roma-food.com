import React, { useState, useEffect } from 'react';
import { Product } from './types';
import { PRODUCTS } from './data/products';
import { Gr8rNavbar } from './components/Gr8rNavbar';
import { Gr8rHero } from './components/Gr8rHero';
import { Gr8rStatement } from './components/Gr8rStatement';
import { Gr8rMenu } from './components/Gr8rMenu';
import { Gr8rFeatures } from './components/Gr8rFeatures';
import { Gr8rBranches } from './components/Gr8rBranches';
import { Gr8rTestimonials } from './components/Gr8rTestimonials';
import { Gr8rFaq } from './components/Gr8rFaq';
import { Gr8rBlog } from './components/Gr8rBlog';
import { Gr8rFooter } from './components/Gr8rFooter';
import { AboutPage } from './components/AboutPage';
import { LegalPage, LegalTabType } from './components/LegalPage';
import { BrandGuideModal } from './components/BrandGuideModal';
import { SampleInquiryDrawer } from './components/SampleInquiryDrawer';
import { FloatingWhatsAppWidget } from './components/FloatingWhatsAppWidget';

export type AppRoute = 'home' | 'about' | 'terms' | 'privacy' | 'cookie';

export default function App() {
  // Parse route from window.location.pathname and hash
  const getRouteFromUrl = (): { route: AppRoute; section?: string } => {
    const rawPath = window.location.pathname.toLowerCase().replace(/\/$/, '');
    const rawHash = window.location.hash.toLowerCase().replace(/^#/, '');

    // 1. Pathname matches (Primary for Meta API verification & standard web URLs)
    if (rawPath === '/privacy-policy' || rawPath === '/privacy' || rawPath === '/data-deletion') {
      return { route: 'privacy' };
    }
    if (rawPath === '/terms-and-conditions' || rawPath === '/terms' || rawPath === '/terms-of-service') {
      return { route: 'terms' };
    }
    if (rawPath === '/cookie-policy' || rawPath === '/cookies') {
      return { route: 'cookie' };
    }
    if (rawPath === '/about') {
      return { route: 'about' };
    }

    // 2. Hash-based matches (Fallback for static anchors)
    if (rawHash === 'privacy-policy' || rawHash === 'privacy' || rawHash === 'data-deletion') {
      return { route: 'privacy' };
    }
    if (rawHash === 'terms-and-conditions' || rawHash === 'terms') {
      return { route: 'terms' };
    }
    if (rawHash === 'cookie-policy' || rawHash === 'cookies' || rawHash === 'cookie') {
      return { route: 'cookie' };
    }
    if (rawHash === 'about') {
      return { route: 'about' };
    }

    // Default Home page
    return { route: 'home', section: rawHash };
  };

  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => getRouteFromUrl().route);
  const [isBrandGuideOpen, setIsBrandGuideOpen] = useState(false);
  const [isSampleBagOpen, setIsSampleBagOpen] = useState(false);
  const [requestedSamples, setRequestedSamples] = useState<Product[]>([]);

  // Listen to browser forward/backward buttons and hash changes
  useEffect(() => {
    const syncRoute = () => {
      const { route, section } = getRouteFromUrl();
      setCurrentRoute(route);
      if (route === 'home' && section) {
        setTimeout(() => {
          const el = document.getElementById(section);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  // Set document title according to active route
  useEffect(() => {
    if (currentRoute === 'privacy') {
      document.title = 'Privacy Policy | ROMAS Chocolates - Roma Foods';
    } else if (currentRoute === 'terms') {
      document.title = 'Terms & Conditions | ROMAS Chocolates - Roma Foods';
    } else if (currentRoute === 'cookie') {
      document.title = 'Cookie Policy | ROMAS Chocolates - Roma Foods';
    } else if (currentRoute === 'about') {
      document.title = 'About ROMAS Chocolates | Pure Chocolate Craft';
    } else {
      document.title = 'ROMAS Chocolates – Spreading Happiness';
    }
  }, [currentRoute]);

  // Push URL to browser history
  const navigateTo = (path: string, route: AppRoute) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = (sectionId?: string) => {
    if (currentRoute !== 'home') {
      navigateTo('/', 'home');
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateAbout = () => {
    navigateTo('/about', 'about');
  };

  const handleNavigateLegal = (tab: LegalTabType) => {
    const routeMap: Record<LegalTabType, { path: string; route: AppRoute }> = {
      terms: { path: '/terms-and-conditions', route: 'terms' },
      privacy: { path: '/privacy-policy', route: 'privacy' },
      cookie: { path: '/cookie-policy', route: 'cookie' },
    };
    const target = routeMap[tab];
    navigateTo(target.path, target.route);
  };

  const handleRequestSample = (product: Product) => {
    if (!requestedSamples.some((p) => p.id === product.id)) {
      setRequestedSamples((prev) => [...prev, product]);
    }
    setIsSampleBagOpen(true);
  };

  const handleRemoveSample = (productId: string) => {
    setRequestedSamples((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleClearSamples = () => {
    setRequestedSamples([]);
  };

  const handleSelectMenuItem = (item: any) => {
    const matching =
      PRODUCTS.find((p) =>
        p.name.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])
      ) || PRODUCTS[0];
    handleRequestSample(matching);
  };

  // Check if current route is one of the dedicated legal pages
  const isLegalRoute = currentRoute === 'terms' || currentRoute === 'privacy' || currentRoute === 'cookie';

  return (
    <div className="min-h-screen bg-[#381A0E] text-[#FEE8B4] flex flex-col font-sans selection:bg-[#F9BD03] selection:text-[#381A0E] antialiased">
      
      {/* 1. Show Main Navbar on Home and About pages */}
      {!isLegalRoute && (
        <Gr8rNavbar
          onOpenReservation={() => setIsSampleBagOpen(true)}
          onNavigate={(id) => {
            if (id === 'about') {
              handleNavigateAbout();
            } else if (id === 'home') {
              handleNavigateHome();
            } else {
              handleNavigateHome(id);
            }
          }}
          currentPage={currentRoute === 'about' ? 'about' : 'home'}
        />
      )}

      {/* Main Content Layout based on Current Active Route */}
      <main className="flex-1 w-full">
        {/* Dedicated Legal Routes (for Meta API / WhatsApp Cloud API verification) */}
        {isLegalRoute && (
          <LegalPage
            currentTab={currentRoute as LegalTabType}
            onSelectTab={handleNavigateLegal}
            onNavigateHome={(id) => handleNavigateHome(id)}
            onNavigateAbout={handleNavigateAbout}
            onOpenReservation={() => setIsSampleBagOpen(true)}
            onOpenBrandGuide={() => setIsBrandGuideOpen(true)}
          />
        )}

        {/* Dedicated About Page featuring Monumental 3D ROMAS Chocolate Slab on Floor */}
        {currentRoute === 'about' && (
          <AboutPage
            onOpenReservation={() => setIsSampleBagOpen(true)}
            onNavigateHome={() => handleNavigateHome()}
          />
        )}

        {/* Home Page: Hero with 1080p Image Sequence + 3 Floating Canisters + Menu + Commitments + Branches */}
        {currentRoute === 'home' && (
          <>
            <Gr8rHero />
            <Gr8rStatement />
            <Gr8rMenu onSelectItem={handleSelectMenuItem} />
            <Gr8rFeatures />
            <Gr8rBranches />
            <Gr8rTestimonials />
            <Gr8rFaq />
            <Gr8rBlog />
            
            {/* Grand ROMAS Footer on Home Page */}
            <Gr8rFooter
              onOpenReservation={() => setIsSampleBagOpen(true)}
              onOpenBrandGuide={() => setIsBrandGuideOpen(true)}
              onNavigate={(id) => handleNavigateHome(id)}
              onOpenLegal={handleNavigateLegal}
            />
          </>
        )}
      </main>

      {/* Official Brand Standards & Usage Guidelines Modal */}
      <BrandGuideModal
        isOpen={isBrandGuideOpen}
        onClose={() => setIsBrandGuideOpen(false)}
      />

      {/* B2B Trade Sample Inquiry Drawer */}
      <SampleInquiryDrawer
        isOpen={isSampleBagOpen}
        onClose={() => setIsSampleBagOpen(false)}
        selectedSamples={requestedSamples}
        onRemoveSample={handleRemoveSample}
        onClearSamples={handleClearSamples}
        onProceedToInquiry={() => {
          setIsSampleBagOpen(false);
          handleNavigateHome('contact');
        }}
      />

      {/* Floating Animated WhatsApp & Trade Concierge Widget */}
      <FloatingWhatsAppWidget />
    </div>
  );
}
