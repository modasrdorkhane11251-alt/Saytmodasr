export interface Point2D {
  x: number;
  y: number;
}

export type DrawerType = 'shop' | 'collections' | 'journal' | 'cart' | null;

export type CornerPosition = 'tl' | 'tr' | 'bl' | 'br';

export interface ShopItem {
  id: string;
  title: string;
  price: number;
  priceFormatted: string;
  tag: string;
}

export interface CartEntry {
  uid: string;
  item: ShopItem;
}

export interface CollectionItem {
  id: string;
  series: string;
  title: string;
  description: string;
}

export interface JournalItem {
  id: string;
  date: string;
  title: string;
  readTime: string;
}

export interface CheckerSquare {
  id: string;
  x: number;
  y: number;
  size: number;
}

export const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260802_074534_f0d9d476-3f86-4c67-9b12-dfc63d99da41.png&w=1920&q=85';

export const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260802_075145_1b557479-775b-43af-8270-f45d79d97d5a.png&w=1920&q=85';

export const SPOTLIGHT_GRADIENT_STOPS: ReadonlyArray<readonly [number, string]> = [
  [0, 'rgba(255,255,255,1)'],
  [0.4, 'rgba(255,255,255,1)'],
  [0.6, 'rgba(255,255,255,0.75)'],
  [0.75, 'rgba(255,255,255,0.4)'],
  [0.88, 'rgba(255,255,255,0.12)'],
  [1, 'rgba(255,255,255,0)'],
];

export const CORNER_PATHS: Record<CornerPosition, string> = {
  tl: 'M0 11.5V0.5H11.5',
  tr: 'M0.5 0.5H11.5V11.5',
  bl: 'M0 0.5V11.5H11.5',
  br: 'M0.5 11.5H11.5V0.5',
};

export const SHOP_ITEMS: ReadonlyArray<ShopItem> = [
  {
    id: 'cyber-tex-overcoat',
    title: 'CYBER-TEX OVERCOAT',
    price: 850,
    priceFormatted: '$850',
    tag: 'LIMITED EDITION',
  },
  {
    id: 'geo-mesh-tech-hoodie',
    title: 'GEO-MESH TECH HOODIE',
    price: 320,
    priceFormatted: '$320',
    tag: 'NEW DROP',
  },
  {
    id: 'orbital-tapered-trousers',
    title: 'ORBITAL TAPERED TROUSERS',
    price: 290,
    priceFormatted: '$290',
    tag: 'IN STOCK',
  },
  {
    id: 'modular-all-weather-vest',
    title: 'MODULAR ALL-WEATHER VEST',
    price: 410,
    priceFormatted: '$410',
    tag: 'PRE-ORDER',
  },
];

export const COLLECTION_ITEMS: ReadonlyArray<CollectionItem> = [
  {
    id: 'series-01',
    series: 'SERIES 01',
    title: 'SYNTHETIC HORIZONS',
    description:
      'Ultra-durable weather-sealed fabrics with minimalist silhouette architecture.',
  },
  {
    id: 'series-02',
    series: 'SERIES 02',
    title: 'KINETIC FORM',
    description:
      'Ergonomic streetwear designed for maximum mobility and temperature equilibrium.',
  },
  {
    id: 'series-03',
    series: 'SERIES 03',
    title: 'MONOCHROME ZERO',
    description:
      'Pure black and white structural tailoring crafted from 100% recycled polymers.',
  },
];

export const JOURNAL_ITEMS: ReadonlyArray<JournalItem> = [
  {
    id: 'aug-2026',
    date: 'AUG 2026',
    title: 'THE ARCHITECTURE OF NEXT-GEN TEXTILES',
    readTime: '4 MIN READ',
  },
  {
    id: 'jul-2026',
    date: 'JUL 2026',
    title: 'CIRCULAR DESIGN IN HIGH-END APPAREL',
    readTime: '6 MIN READ',
  },
  {
    id: 'jun-2026',
    date: 'JUN 2026',
    title: 'MINIMALISM AS A FUNCTIONAL STATEMENT',
    readTime: '3 MIN READ',
  },
];

export const DRAWER_HEADERS: Record<
  Exclude<DrawerType, null>,
  { title: string; subtitle?: string }
> = {
  shop: { title: 'Catalog', subtitle: 'Featured Garments' },
  collections: { title: 'Archive 2026', subtitle: 'Season Lineup' },
  journal: { title: 'Editorial', subtitle: 'Latest Dispatches' },
  cart: { title: 'Shopping Bag' },
};

/**
 * Computes fluid spotlight radius: Math.round(Math.min(420, Math.max(160, innerWidth * 0.16)))
 */
export function computeSpotlightRadius(innerWidth: number): number {
  return Math.round(Math.min(420, Math.max(160, innerWidth * 0.16)));
}

/**
 * Computes fluid parallax grid cell size: Math.round(Math.min(64, Math.max(36, innerWidth * 0.028)))
 */
export function computeGridCellSize(innerWidth: number): number {
  return Math.round(Math.min(64, Math.max(36, innerWidth * 0.028)));
}

/**
 * Eases smooth cursor toward raw mouse position with factor 0.1.
 */
export function stepSmoothCursor(
  smooth: Point2D,
  mouse: Point2D,
  factor = 0.1
): Point2D {
  return {
    x: smooth.x + (mouse.x - smooth.x) * factor,
    y: smooth.y + (mouse.y - smooth.y) * factor,
  };
}

/**
 * Normalizes smoothed cursor to [-0.5, 0.5] and eases grid offset toward cx*16 / cy*16 with factor 0.06.
 */
export function stepParallaxOffset(
  offset: Point2D,
  smooth: Point2D,
  width: number,
  height: number,
  factor = 0.06
): Point2D {
  const cx = width > 0 ? smooth.x / width - 0.5 : 0;
  const cy = height > 0 ? smooth.y / height - 0.5 : 0;
  const targetX = cx * 16;
  const targetY = cy * 16;
  return {
    x: offset.x + (targetX - offset.x) * factor,
    y: offset.y + (targetY - offset.y) * factor,
  };
}

/**
 * Builds the 4-row checkerboard grid of 3.8×3.8 squares inside viewBox 0 0 36 18.
 * Even rows (1-indexed rows 2 and 4, i.e. rowIndex 1 and 3) are shifted horizontally by 2.25.
 */
export function generateCheckerboardSquares(): CheckerSquare[] {
  const squares: CheckerSquare[] = [];
  const size = 3.8;
  const rowPositions = [0, 4.7, 9.4, 14.1];
  const baseCols = [0, 7.2, 14.4, 21.6, 28.8];

  for (let r = 0; r < rowPositions.length; r++) {
    const shift = r % 2 === 1 ? 2.25 : 0;
    const y = rowPositions[r];
    for (let c = 0; c < baseCols.length; c++) {
      const x = Number((baseCols[c] + shift).toFixed(2));
      squares.push({
        id: `r${r}-c${c}`,
        x,
        y,
        size,
      });
    }
  }
  return squares;
}

export const CHECKERBOARD_SQUARES: ReadonlyArray<CheckerSquare> =
  generateCheckerboardSquares();

export function addCartItem(
  cart: ReadonlyArray<CartEntry>,
  item: ShopItem,
  uid: string
): CartEntry[] {
  return [...cart, { uid, item }];
}

export function removeCartItem(
  cart: ReadonlyArray<CartEntry>,
  uid: string
): CartEntry[] {
  return cart.filter((entry) => entry.uid !== uid);
}

export function calculateCartTotal(cart: ReadonlyArray<CartEntry>): number {
  return cart.reduce((sum, entry) => sum + entry.item.price, 0);
}

export function formatAddedToastMessage(title: string): string {
  return `Added "${title}" to your shopping bag.`;
}
