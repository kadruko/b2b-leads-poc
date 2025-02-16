import { ProductVariant } from './product-variant/product-variant';

export type CheckoutLineItem = {
  discountAllocations: any[];
  finalLinePrice: any;
  id: string | null;
  properties: any[];
  quantity: number;
  sellingPlanAllocation?: any | null;
  title: string | null;
  variant: ProductVariant | null;
};
