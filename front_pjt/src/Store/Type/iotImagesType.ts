import { Dish } from "./DishType";

export interface IotImages {
  createdDate: string,
  dish: Dish,
  id: number,
  imgUrl: string,
  isLike: boolean,
}
