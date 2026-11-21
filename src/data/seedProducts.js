/**
 * The 8 sample products from the mock-up. They are copied into localStorage
 * the first time the app runs (see productStore.js).
 *
 * Photos were extracted from design/main-screens.pdf into /public/products.
 * Names, prices, categories and stock levels match the design exactly; the
 * headphones description is the design's text, the others are written to match.
 */

const UPDATED = '2026-11-17T10:00:00.000Z'

export const SEED_PRODUCTS = [
  {
    id: '1',
    sku: 'SA-EL-001',
    name: 'Studio headphones',
    category: 'Electronics',
    price: 129,
    stock: 24,
    imageUrl: '/products/studio-headphones.jpg',
    description:
      'Premium wireless headphones with rich, balanced sound. Soft ear cushions and 30-hour battery life keep you comfortable from your first call to your last playlist.',
    updatedAt: UPDATED,
  },
  {
    id: '2',
    sku: 'SA-AC-001',
    name: 'Everyday backpack',
    category: 'Accessories',
    price: 79,
    stock: 18,
    imageUrl: '/products/everyday-backpack.jpg',
    description:
      'A waxed-canvas backpack with leather straps, a padded laptop sleeve and enough pockets to keep the essentials sorted from commute to weekend.',
    updatedAt: UPDATED,
  },
  {
    id: '3',
    sku: 'SA-HL-001',
    name: 'Arc desk lamp',
    category: 'Home & living',
    price: 59,
    stock: 3,
    imageUrl: '/products/arc-desk-lamp.jpg',
    description:
      'A sage-green task lamp with a solid brass base and an adjustable arm. Warm, glare-free light for late nights at the desk.',
    updatedAt: UPDATED,
  },
  {
    id: '4',
    sku: 'SA-HL-002',
    name: 'Ceramic pour-over',
    category: 'Home & living',
    price: 34,
    stock: 42,
    imageUrl: '/products/ceramic-pour-over.jpg',
    description:
      'A hand-glazed ceramic dripper and matching cup for slow, even extraction. Fits standard paper filters and most mugs.',
    updatedAt: UPDATED,
  },
  {
    id: '5',
    sku: 'SA-FW-001',
    name: 'Essential sneakers',
    category: 'Footwear',
    price: 95,
    stock: 12,
    imageUrl: '/products/essential-sneakers.jpg',
    description:
      'Clean leather low-tops on a natural gum sole. Cushioned insoles make them an easy everyday pair.',
    updatedAt: UPDATED,
  },
  {
    id: '6',
    sku: 'SA-AC-002',
    name: 'Analog timepiece',
    category: 'Accessories',
    price: 149,
    stock: 0,
    imageUrl: '/products/analog-timepiece.jpg',
    description:
      'A minimalist steel watch with a cream dial and tan leather strap. Water resistant to 50 metres.',
    updatedAt: UPDATED,
  },
  {
    id: '7',
    sku: 'SA-EL-002',
    name: 'Portable speaker',
    category: 'Electronics',
    price: 69,
    stock: 31,
    imageUrl: '/products/portable-speaker.jpg',
    description:
      'A compact fabric-wrapped Bluetooth speaker with 360° sound and 12 hours of playtime. Splash resistant for the kitchen or the park.',
    updatedAt: UPDATED,
  },
  {
    id: '8',
    sku: 'SA-LS-001',
    name: 'Everyday bottle',
    category: 'Lifestyle',
    price: 28,
    stock: 56,
    imageUrl: '/products/everyday-bottle.jpg',
    description:
      'A double-walled stainless steel bottle that keeps drinks cold for 24 hours or hot for 12. Leak-proof loop cap included.',
    updatedAt: UPDATED,
  },
]
