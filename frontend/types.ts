
export interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface GarageSize {
  capacity: number;
}

export interface Garage {
  _id: string;
  num: number;
  name: string;
  size: GarageSize;
}

export type ApiResponse<T> = {
  products?: T;
  garages?: T;
  product?: T;
  garage?: T;
  message: string;
};
