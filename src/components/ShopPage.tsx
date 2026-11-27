import React, { useEffect } from 'react';
import { ShopSection } from './ShopSection';
import { Gr8rFooter } from './Gr8rFooter';
import { LegalTabType } from './LegalPage';
import { EcommerceCategory, EcommerceProduct } from '../types/ecommerce';

interface ShopPageProps {
  initialCategory?: EcommerceCategory;
  onNavigateHome: (sectionId?: string) => void;
  onNavigateAbout?: () => void;
  onSelectProduct?: (product: EcommerceProduct) => void;
  onOpenReservation?: () => void;
  onOpenBrandGuide?: () => void;
  onOpenLegal?: (tab: LegalTabType) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'all',
  onNavigateHome,
  onSelectProduct,
  onOpenReservation,
  onOpenBrandGuide,
  onOpenLegal,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Products | ROMAS Chocolates';
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C0E07] flex flex-col pt-14 sm:pt-16">
      <main className="flex-1 w-full">
        {/* Exact Popat Namkeen Style Products Store with 3D Marble Shelves */}
        <ShopSection
          isStandalonePage={true}
          initialCategory={initialCategory}
          onSelectProduct={onSelectProduct}
          onNavigateHome={() => onNavigateHome()}
        />
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