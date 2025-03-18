export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category_id: number;
  stock_quantity: number;
  image_url: string;
  category: Category;
}

export interface Category {
    id: number;
    name: string;
  }