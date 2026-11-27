export interface OfficialProductVariant {
  id: string;
  label: string;
  badge?: string;
  frontImage: string;
  backImage: string;
}

export interface OfficialProduct {
  id: string;
  category: 'slabs' | 'choco_chips' | 'buttons' | 'paste' | 'butterscotch' | 'tutti_frutti';
  categoryLabel: string;
  name: string;
  tagline: string;
  description: string;
  packSize: string;
  applications: string[];
  variants: OfficialProductVariant[];
}

export const OFFICIAL_PRODUCTS: OfficialProduct[] = [
  {
    id: 'slabs',
    category: 'slabs',
    categoryLabel: 'COMPOUND SLAB',
    name: 'ROMAS Compound Slab',
    tagline: 'Non-Temper Easy Melt Formula',
    description: 'Effortless melting, enrobing, and mirror gloss for master patisserie, bakeries, and confectionery.',
    packSize: '500gm Centre Sealed Metallic · 10kg Carton (0.5kg × 20)',
    applications: ['Assorted Moulded Chocolates', 'Bakery Enrobing', 'Ice Cream Coatings', 'Ganache'],
    variants: [
      {
        id: 'dark',
        label: 'Dark',
        badge: 'Rich Cocoa',
        frontImage: '/assets/official_products_png/slabs/dark_front.webp',
        backImage: '/assets/official_products_png/slabs/dark_back.webp',
      },
      {
        id: 'milk',
        label: 'Milk',
        badge: 'Creamy Dairy',
        frontImage: '/assets/official_products_png/slabs/milk_front.webp',
        backImage: '/assets/official_products_png/slabs/milk_back.webp',
      },
      {
        id: 'white',
        label: 'White',
        badge: 'Velvety Smooth',
        frontImage: '/assets/official_products_png/slabs/white_front.webp',
        backImage: '/assets/official_products_png/slabs/white_back.webp',
      },
    ],
  },
  {
    id: 'choco_chips',
    category: 'choco_chips',
    categoryLabel: 'CHOCO CHIPS',
    name: 'ROMAS Choco Chips',
    tagline: 'Bake-Stable Glossy Teardrops',
    description: 'Holds shape in 200°C oven baking. Glossy bite for cookies, muffins, cakes, brownies, and sundaes.',
    packSize: '1kg Zipper Metallic Pouch · 10kg Carton (1kg × 10)',
    applications: ['Cookies & Biscuits', 'Cakes & Muffins', 'Ice Cream & Sundaes', 'Waffles & Frappes'],
    variants: [
      {
        id: 'milk',
        label: 'Milk',
        badge: 'Bestseller',
        frontImage: '/assets/official_products_png/choco_chips/milk_front.webp',
        backImage: '/assets/official_products_png/choco_chips/milk_back.webp',
      },
      {
        id: 'dark',
        label: 'Dark',
        badge: 'Intense Cocoa',
        frontImage: '/assets/official_products_png/choco_chips/dark_front.webp',
        backImage: '/assets/official_products_png/choco_chips/dark_back.webp',
      },
      {
        id: 'white',
        label: 'White',
        badge: 'Creamy Vanilla',
        frontImage: '/assets/official_products_png/choco_chips/white_front.webp',
        backImage: '/assets/official_products_png/choco_chips/white_back.webp',
      },
    ],
  },
  {
    id: 'buttons',
    category: 'buttons',
    categoryLabel: 'BUTTONS (COINS)',
    name: 'ROMAS Buttons / Coins',
    tagline: 'Callets & Drop Melting Coins',
    description: 'Easy-melting chocolate coins for effortless tempering, moulding, enrobing, and silk ganache.',
    packSize: '1kg Zipper Metallic Pouch · 10kg Carton (1kg × 10)',
    applications: ['Moulded Chocolates', 'Ganache & Truffles', 'Enrobing & Dipping', 'Decorations'],
    variants: [
      {
        id: 'dark',
        label: 'Dark',
        badge: 'Artisan Dark',
        frontImage: '/assets/official_products_png/buttons/dark_front.webp',
        backImage: '/assets/official_products_png/buttons/dark_back.webp',
      },
      {
        id: 'milk',
        label: 'Milk',
        badge: 'Rich Milk',
        frontImage: '/assets/official_products_png/buttons/milk_front.webp',
        backImage: '/assets/official_products_png/buttons/milk_back.webp',
      },
      {
        id: 'white',
        label: 'White',
        badge: 'Pure White',
        frontImage: '/assets/official_products_png/buttons/white_front.webp',
        backImage: '/assets/official_products_png/buttons/white_back.webp',
      },
    ],
  },
  {
    id: 'paste',
    category: 'paste',
    categoryLabel: 'CHOCO PASTE',
    name: 'ROMAS Choco Paste',
    tagline: 'Spreads, Fillings & Truffle Paste',
    description: 'Silky, rich chocolate pastes formulated for ice cream fillings, artisan bakery truffles, and enrobing.',
    packSize: '25kg / 20kg / 13kg / 1kg (Dark) · 25kg / 20kg (Milk, White)',
    applications: ['Ice Cream Filling', 'Bakery Truffles', 'Spreads & Fillings', 'Toppings & Ganache'],
    variants: [
      {
        id: 'dark',
        label: 'Dark',
        badge: 'DPP Formulation',
        frontImage: '/assets/official_products_png/paste/dark_front.webp',
        backImage: '/assets/official_products_png/paste/dark_back.webp',
      },
      {
        id: 'milk',
        label: 'Milk',
        badge: 'MPP Formulation',
        frontImage: '/assets/official_products_png/paste/milk_front.webp',
        backImage: '/assets/official_products_png/paste/milk_back.webp',
      },
      {
        id: 'white',
        label: 'White',
        badge: 'WPP Formulation',
        frontImage: '/assets/official_products_png/paste/white_front.webp',
        backImage: '/assets/official_products_png/paste/white_back.webp',
      },
    ],
  },
  {
    id: 'butterscotch',
    category: 'butterscotch',
    categoryLabel: 'BUTTERSCOTCH',
    name: 'ROMAS Butterscotch',
    tagline: 'Caramelized Golden Crunch Inclusions',
    description: 'Crispy caramelized nuts and crunch formulated for butterscotch ice cream, pastries, and praline fillings.',
    packSize: '250gm, 1kg Pouches · 15kg Corrugated Carton',
    applications: ['Ice Cream & Kulfi Crunch', 'Butterscotch Cakes', 'Cookies & Brownies', 'Garnish'],
    variants: [
      {
        id: 'classic',
        label: 'Classic Crunch',
        badge: '100% Crisp',
        frontImage: '/assets/official_products_png/butterscotch/front.webp',
        backImage: '/assets/official_products_png/butterscotch/back.webp',
      },
    ],
  },
  {
    id: 'tutti_frutti',
    category: 'tutti_frutti',
    categoryLabel: 'TUTTI FRUTTI',
    name: 'ROMAS Tutti Frutti',
    tagline: 'Succulent Candied Papaya Inclusions',
    description: 'Vibrant, juicy candied fruit cubes for plum cakes, fruit cookies, sweet buns, and artisanal desserts.',
    packSize: '500gm Bucket · 1000gm Pouch · 10kg / 15kg Carton',
    applications: ['Fruit & Plum Cakes', 'Ice Cream Topping', 'Cookies & Sweet Buns', 'Confectionery'],
    variants: [
      {
        id: 'multi',
        label: 'Multi-Color',
        badge: 'Natural Flavours',
        frontImage: '/assets/official_products_png/tutti_frutti/front.webp',
        backImage: '/assets/official_products_png/tutti_frutti/back.webp',
      },
    ],
  },
];

