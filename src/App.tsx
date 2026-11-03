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
import { CareerPage } from './components/CareerPage';
import { AdminPage } from './components/AdminPage';
import { ShopPage } from './components/ShopPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { CartPage } from './components/CartPage';
import { ECOMMERCE_PRODUCTS } from './data/ecommerceProducts';
import { EcommerceProduct } from './types/ecommerce';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CartProvider } from './context/CartContext';
import { BrandGuideModal } from './components/BrandGuideModal';
import { SampleInquiryDrawer } from './components/SampleInquiryDrawer';
import { FloatingWhatsAppWidget } from './components/FloatingWhatsAppWidget';
import { ChatbotWidget } from './components/ChatbotWidget';

export type AppRoute = 'home' | 'shop' | 'product' | 'cart' | 'about' | 'terms' | 'privacy' | 'cookie' | 'career' | 'admin';

export default function App() {
  // Parse route from window.location.pathname and hash
  const getRouteFromUrl = (): { route: AppRoute; section?: string; productId?: string } => {
    const rawPath = window.location.pathname.toLowerCase().replace(/\/$/, '');
    const rawHash = window.location.hash.toLowerCase().replace(/^#/, '');

    // 1. Pathname matches
    if (rawPath === '/cart' || rawPath === '/bag' || rawPath === '/checkout') {
      return { route: 'cart' };
    }
    if (rawPath === '/product' || rawPath.startsWith('/product/')) {
      return { route: 'product' };
    }
    if (rawPath === '/shop' || rawPath === '/store' || rawPath === '/products') {
      return { route: 'shop' };
    }
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
    if (rawPath === '/careers' || rawPath === '/career') {
      return { route: 'career' };
    }
    if (rawPath === '/admin') {
      return { route: 'admin' };
    }

    // 2. Hash-based matches
    if (rawHash === 'cart' || rawHash === 'bag') {
      return { route: 'cart' };
    }
    if (rawHash.startsWith('product')) {
      return { route: 'product' };
    }
    if (rawHash === 'shop' || rawHash === 'store') {
      return { route: 'shop' };
    }
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
    if (rawHash === 'careers' || rawHash === 'career') {
      return { route: 'career' };
    }

    // Default Home page
    return { route: 'home', section: rawHash };
  };

  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => getRouteFromUrl().route);
  const [selectedProduct, setSelectedProduct] = useState<EcommerceProduct>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pid = params.get('id');
      if (pid) {
        const found = ECOMMERCE_PRODUCTS.find((p) => p.id === pid);
        if (found) return found;
      }
    }
    return ECOMMERCE_PRODUCTS[0];
  });
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
    if (currentRoute === 'product' && selectedProduct) {
      document.title = `${selectedProduct.name} | ROMAS Chocolates`;
    } else if (currentRoute === 'cart') {
      document.title = 'Shopping Cart | ROMAS Chocolates';
    } else if (currentRoute === 'shop') {
      document.title = 'Shop Authentic 3D Chocolates | ROMAS Chocolates';
    } else if (currentRoute === 'privacy') {
      document.title = 'Privacy Policy | ROMAS Chocolates - Roma Foods';
    } else if (currentRoute === 'terms') {
      document.title = 'Terms & Conditions | ROMAS Chocolates - Roma Foods';
    } else if (currentRoute === 'cookie') {
      document.title = 'Cookie Policy | ROMAS Chocolates - Roma Foods';
    } else if (currentRoute === 'about') {
      document.title = 'About ROMAS Chocolates | Pure Chocolate Craft';
    } else if (currentRoute === 'career') {
      document.title = 'Careers at ROMAS Chocolates | Roma Foods';
    } else if (currentRoute === 'admin') {
      document.title = 'Admin · ROMAS Chocolates';
    } else {
      document.title = 'ROMAS Chocolates – Spreading Happiness';
    }
  }, [currentRoute, selectedProduct]);

  // Push URL to browser history
  const navigateTo = (path: string, route: AppRoute) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateShop = () => {
    navigateTo('/shop', 'shop');
  };

  const handleNavigateCart = () => {
    navigateTo('/cart', 'cart');
  };

  const handleOpenProduct = (prod: EcommerceProduct) => {
    setSelectedProduct(prod);
    navigateTo(`/product?id=${prod.id}`, 'product');
  };

  const handleNavigateHome = (sectionId?: string) => {
    if (sectionId === 'shop') {
      handleNavigateShop();
      return;
    }
    if (sectionId === 'careers') {
      navigateTo('/careers', 'career');
      return;
    }
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
  const isCareerRoute = currentRoute === 'career';
  const isAdminRoute = currentRoute === 'admin';
  const isCartRoute = currentRoute === 'cart';

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#381A0E] text-[#FEE8B4] flex flex-col font-sans selection:bg-[#F9BD03] selection:text-[#381A0E] antialiased">
        
        {/* 1. Show Main Navbar on Home, Shop and About pages (Cart, Career, Admin, Legal render their own) */}
        {!isLegalRoute && !isCareerRoute && !isAdminRoute && !isCartRoute && (
          <Gr8rNavbar
            onOpenReservation={() => setIsSampleBagOpen(true)}
            onNavigateCart={handleNavigateCart}
            onNavigate={(id) => {
              if (id === 'shop') {
                handleNavigateShop();
              } else if (id === 'cart') {
                handleNavigateCart();
              } else if (id === 'about') {
                handleNavigateAbout();
              } else if (id === 'home') {
                handleNavigateHome();
              } else {
                handleNavigateHome(id);
              }
            }}
            currentPage={currentRoute}
          />
        )}

        {/* Main Content Layout based on Current Active Route */}
        <main className="flex-1 w-full">
          {/* Dedicated Full Screen Professional E-Commerce Cart Page (Flipkart / Amazon Layout) */}
          {currentRoute === 'cart' && (
            <CartPage
              onNavigateHome={(id) => handleNavigateHome(id)}
              onNavigateShop={handleNavigateShop}
              onSelectProduct={handleOpenProduct}
              onOpenBrandGuide={() => setIsBrandGuideOpen(true)}
              onOpenLegal={handleNavigateLegal}
            />
          )}
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

          {/* Dedicated Full Screen Product Details Page (Flipkart / Amazon Full Page Layout) */}
          {currentRoute === 'product' && selectedProduct && (
            <ProductDetailsPage
              product={selectedProduct}
              onBack={() => navigateTo('/shop', 'shop')}
              onNavigateHome={(id) => handleNavigateHome(id)}
              onNavigateShop={handleNavigateShop}
              onNavigateCart={handleNavigateCart}
              onSelectProduct={handleOpenProduct}
              onOpenReservation={() => setIsSampleBagOpen(true)}
              onOpenBrandGuide={() => setIsBrandGuideOpen(true)}
              onOpenLegal={handleNavigateLegal}
            />
          )}

          {/* Dedicated 3D Shop Page (Clean White Background) */}
          {currentRoute === 'shop' && (
            <ShopPage
              onNavigateHome={(id) => handleNavigateHome(id)}
              onNavigateAbout={handleNavigateAbout}
              onSelectProduct={handleOpenProduct}
              onOpenReservation={() => setIsSampleBagOpen(true)}
              onOpenBrandGuide={() => setIsBrandGuideOpen(true)}
              onOpenLegal={handleNavigateLegal}
            />
          )}

          {/* Dedicated About Page featuring Monumental 3D ROMAS Chocolate Slab on Floor */}
          {currentRoute === 'about' && (
            <AboutPage
              onOpenReservation={() => setIsSampleBagOpen(true)}
              onNavigateHome={() => handleNavigateHome()}
            />
          )}

          {/* Dedicated Careers Page */}
          {isCareerRoute && (
            <CareerPage
              onNavigateHome={(id) => handleNavigateHome(id)}
              onNavigateAbout={handleNavigateAbout}
              onOpenReservation={() => setIsSampleBagOpen(true)}
              onOpenBrandGuide={() => setIsBrandGuideOpen(true)}
              onOpenLegal={handleNavigateLegal}
            />
          )}

          {/* Hidden Admin Dashboard (Supabase Auth) */}
          {isAdminRoute && (
            <AdminPage onNavigateHome={() => handleNavigateHome()} />
          )}

          {/* Home Page: Hero with 1080p Image Sequence + 3 Floating Canisters + Menu + Shop + Commitments + Branches */}
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

      {/* B2B Sample Inquiry Drawer */}
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

      {/* Direct E-Commerce Wishlist (Heart) Drawer */}
      <WishlistDrawer
        onNavigateToShop={handleNavigateShop}
        onSelectProduct={handleOpenProduct}
      />

      {/* Floating Animated WhatsApp & Sales Concierge Widget */}
      <FloatingWhatsAppWidget />

      {/* Floating ROMAS AI Chat Assistant (bottom-left, n8n) */}
      <ChatbotWidget />
    </div>
    </CartProvider>
  );
}
