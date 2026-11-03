import React, { useEffect } from 'react';
import { ShopSection } from './ShopSection';
import { Gr8rFooter } from './Gr8rFooter';
import { LegalTabType } from './LegalPage';
import { EcommerceProduct } from '../types/ecommerce';

interface ShopPageProps {
  onNavigateHome: (sectionId?: string) => void;
  onNavigateAbout?: () => void;
  onSelectProduct?: (product: EcommerceProduct) => void;
  onOpenReservation?: () => void;
  onOpenBrandGuide?: () => void;
  onOpenLegal?: (tab: LegalTabType) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onNavigateHome,
  onSelectProduct,
  onOpenReservation,
  onOpenBrandGuide,
  onOpenLegal,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Shop Authentic Chocolates | ROMAS Chocolates';
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#2A1308] flex flex-col">
      <main className="flex-1 w-full bg-white">
        <ShopSection isStandalonePage={true} onSelectProduct={onSelectProduct} />
      </main>

      <Gr8rFooter
        onOpenReservation={onOpenReservation}
        onOpenBrandGuide={onOpenBrandGuide}
        onNavigate={(id) => onNavigateHome(id)}
        onOpenLegal={onOpenLegal}
      />
    </div>
  );
};

