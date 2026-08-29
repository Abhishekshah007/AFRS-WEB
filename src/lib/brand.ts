export const BRAND = {
  deepWine: '#3B010B',
  darkMaroon: '#560B18',
  burgundy: '#75162D',
  sandGold: '#F2D9A0',
  champagneBeige: '#F2E5C6',
  surface: '#FBF6EC',
  ink: '#1A0C0F',
} as const

export const BRAND_GRADIENTS = {
  hero: `linear-gradient(135deg, ${BRAND.deepWine} 0%, ${BRAND.darkMaroon} 42%, ${BRAND.burgundy} 78%, ${BRAND.deepWine} 100%)`,
  gold: `linear-gradient(135deg, ${BRAND.sandGold} 0%, ${BRAND.champagneBeige} 100%)`,
  panel: `linear-gradient(145deg, ${BRAND.deepWine} 0%, ${BRAND.darkMaroon} 55%, ${BRAND.burgundy} 100%)`,
} as const
