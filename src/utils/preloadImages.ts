// High-Performance Browser In-Memory Preloader for all ROMAS Product Assets
export const ALL_ROMAS_PRODUCT_IMAGES = [
  // Choco Chips
  '/assets/official_products_png/choco_chips/milk_front.webp',
  '/assets/official_products_png/choco_chips/milk_back.webp',
  '/assets/official_products_png/choco_chips/dark_front.webp',
  '/assets/official_products_png/choco_chips/dark_back.webp',
  '/assets/official_products_png/choco_chips/white_front.webp',
  '/assets/official_products_png/choco_chips/white_back.webp',

  // Slabs
  '/assets/official_products_png/slabs/dark_front.webp',
  '/assets/official_products_png/slabs/dark_back.webp',
  '/assets/official_products_png/slabs/milk_front.webp',
  '/assets/official_products_png/slabs/milk_back.webp',
  '/assets/official_products_png/slabs/white_front.webp',
  '/assets/official_products_png/slabs/white_back.webp',

  // Buttons
  '/assets/official_products_png/buttons/dark_front.webp',
  '/assets/official_products_png/buttons/dark_back.webp',
  '/assets/official_products_png/buttons/milk_front.webp',
  '/assets/official_products_png/buttons/milk_back.webp',
  '/assets/official_products_png/buttons/white_front.webp',
  '/assets/official_products_png/buttons/white_back.webp',

  // Paste
  '/assets/official_products_png/paste/dark_front.webp',
  '/assets/official_products_png/paste/dark_back.webp',
  '/assets/official_products_png/paste/milk_front.webp',
  '/assets/official_products_png/paste/milk_back.webp',
  '/assets/official_products_png/paste/white_front.webp',
  '/assets/official_products_png/paste/white_back.webp',

  // Butterscotch
  '/assets/official_products_png/butterscotch/front.webp',
  '/assets/official_products_png/butterscotch/back.webp',

  // Tutti Frutti
  '/assets/official_products_png/tutti_frutti/front.webp',
  '/assets/official_products_png/tutti_frutti/back.webp',

  // 3D Marble Shelf
  '/assets/textures/popat_marble_shelf_transparent.png',
];

// Instantly caches all product assets in browser memory/RAM
export function preloadAllProductImages(): void {
  if (typeof window === 'undefined') return;

  ALL_ROMAS_PRODUCT_IMAGES.forEach((url) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
  });
}
