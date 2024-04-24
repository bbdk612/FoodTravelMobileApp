import { FoodModel } from "~/models";

export class FoodService {
  private _foodData: FoodModel[] = [
    {
      id: 1,
      title: "Суши",
      photo: "~/assets/sushi.jpeg",
      description: "Придумайте сами",
      price: 10,
      reustarantId: 2,
    },
    {
      id: 2,
      title: "Шаурма по-пекински",
      photo: "~/assets/shaurma.jpg",
      description: "Придумайте сами",
      price: 20,
      reustarantId: 1,
    },
  ];

  private static _food = new FoodService();

  static receiveFood(): FoodService {
    return this._food;
  }

  get food(): FoodModel[] {
    return this._foodData;
  }

  findFoodById(id: number): FoodModel {
    return this._foodData.find((food) => food.id === id);
  }
}
