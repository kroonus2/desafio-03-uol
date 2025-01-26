import { Review } from "./review";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  details: string;
  img: string;
  reviews: Review[];
  popularity: number;
  createdAt: string;
}
