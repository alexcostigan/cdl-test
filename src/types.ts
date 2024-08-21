export type Item = 'A' | 'B' | 'C' | 'D';

export interface PricingRule {
  unitPrice: number;
  discountQuantity?: number;
  discountPrice?: number;
}

export interface PricingRules {
  [key: string]: PricingRule;
}

export interface BasketProps {
  items: Item[];
  pricingRules: PricingRules;
  incrementItem: (item: Item) => void;
  decrementItem: (item: Item) => void;
  removeItem: (item: Item) => void;
}

export interface ItemButtonProps {
  item: Item;
  pricingRules: PricingRules;
  onAdd: (item: Item) => void;
}