import { CartLine } from './cart-line';

export type Cart = {
  attributes: any[];
  cost: any;
  id: string | null;
  lines: CartLine[];
  totalQuantity: number;
};
