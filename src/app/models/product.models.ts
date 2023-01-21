export type Products = Product[];

export interface Product {
  id?: string;
  make: string;
  model: string;
  price: number;
  notes?: string;
}
