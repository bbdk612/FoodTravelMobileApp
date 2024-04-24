import { Observable } from "@nativescript/core";
import { FoodModel } from "~/models";
import { FoodService } from "~/services";

export class FoodViewModel extends Observable {
  private _foodData: FoodModel;

  constructor(private _context: { foodId: number }) {
    super();
    this._foodData = FoodService.receiveFood().findFoodById(
      this._context.foodId
    );
  }

  get food(): FoodModel {
    return this._foodData;
  }
}
