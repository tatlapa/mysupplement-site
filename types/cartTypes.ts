export interface Cart {
  id: number;
  product: {
    id: number;
    name: string;
    image_url: string;
    price: number;
    stock_quantity: number;
  };
  quantity: number;
}
