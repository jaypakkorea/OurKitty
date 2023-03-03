import { AdminGroupType } from './AdminType';

export interface DishLocation {
  dishId: number;
  lat: number;
  lon: number;
  loadAddress: string;
  image: any;
}

export interface DishAddType {
  serialNumber: string;
  dishName: string;
  otherNote: string;
}

export interface Dish {
  id?: any;
  adminGroup?: AdminGroupType;
  dishImg?: any;
  dishName?: any;
  dishState?: any;
  foodWeightChangeDate?: any;
  food_weight?: any;
  lat?: any;
  loadAddress?: any;
  lon?: any;
  otherNote?: any;
  serialNumber?: any;
  click?: boolean;
  image?: any;
  imageUrl?: any;
}