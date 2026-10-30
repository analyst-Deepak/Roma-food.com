export type ProductCategory =
  | 'compounds'
  | 'couverture'
  | 'fillings'
  | 'cocoa'
  | 'decorations'
  | 'coated'
  | 'retail';

export type AudienceSegment =
  | 'all'
  | 'bakery'
  | 'pastry-chefs'
  | 'industrial'
  | 'home-bakers';

export type ConfectioneryApplication =
  | 'moulding'
  | 'enrobing'
  | 'baking'
  | 'glaze'
  | 'fillings'
  | 'ice-cream'
  | 'decorations';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  categoryLabel: string;
  packSize: string;
  image: string;
  description: string;
  detailedDescription: string;
  features: string[];
  applications: string[];
  ingredients: string;
  flavourProfile: string;
  badge?: string;
  isHeroProduct?: boolean;
  fluidity?: number; // 1 to 5 drops
  bakeStable?: boolean;
  cocoaContent?: string;
  fatContent?: string;
  temperNeeded?: boolean;
  segments: ('bakery' | 'pastry-chefs' | 'industrial' | 'home-bakers')[];
  nutritionalInfo?: {
    energy: string;
    protein: string;
    carbohydrate: string;
    sugars: string;
    totalFat: string;
    transFat?: string;
    saturatedFat?: string;
  };
}

export interface ChefRecipe {
  id: string;
  title: string;
  category: string;
  prepTime: string;
  skillLevel: 'Pastry Chef' | 'Bakery Standard' | 'Artisan Enthusiast';
  recommendedProduct: string;
  image: string;
  description: string;
  ingredients: string[];
  chefTip: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  city: string;
  enquiryType: 'industrial' | 'bakery' | 'distributor' | 'corporate_gifting' | 'product';
  productInterest?: string;
  estimatedVolume?: string;
  message: string;
}

export interface UsageApplication {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tip: string;
  recommendedProduct: string;
  iconName: string;
}
