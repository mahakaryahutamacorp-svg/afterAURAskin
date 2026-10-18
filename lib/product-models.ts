export type ProductVariant = 'tube' | 'cylinder' | 'jar';

export interface ProductModel {
  path: string;
  variant: ProductVariant;
}

/**
 * Meshy exports belong in /public/models.
 * Sunblock uses the tube mesh; facial wash uses the cylinder mesh.
 * Until those files are present, ProductViewer draws a matching stand-in.
 */
export const PRODUCT_MODELS = {
  sunblock: {
    path: '/models/sunblock-tube.glb',
    variant: 'tube',
  },
  facialWash: {
    path: '/models/facial-wash-cylinder.glb',
    variant: 'cylinder',
  },
  nightCream: {
    path: '/models/night-cream-jar.glb',
    variant: 'jar',
  },
} as const satisfies Record<string, ProductModel>;
