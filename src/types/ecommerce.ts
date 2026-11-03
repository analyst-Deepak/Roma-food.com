export type EcommerceCategory = 'all' | 'slabs' | 'couverture' | 'praline' | 'cocoa' | 'gifting';

export interface EcommerceProduct {
  id: string;
  name: string;
  hindiName?: string;
  subtitle: string;
  category: EcommerceCategory;
  categoryLabel: string;
  price: number;
  mrp: number;
  weight: string;
  image: string;
  rating: number;
  reviewCount: number;
  tag?: string;
  badgeColor?: string;
  inStock: boolean;
  cocoaContent?: string;
  description: string;
  highlights: string[];
  shelfLife: string;
  storage: string;
  vegetarian: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: EcommerceProduct;
  quantity: number;
}

export interface CustomerOrderDetails {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  notes?: string;
  paymentMethod: 'whatsapp' | 'cod' | 'upi';
}

