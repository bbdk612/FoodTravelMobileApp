import { Observable } from "@nativescript/core";
import { FoodModel } from "~/models";
import { FoodService } from "~/services";

export class FoodViewModel extends Observable {
  private _foodData: FoodModel;

  constructor(private _context: { foodId: string }) {
    super();
    this.receiveFoodData();
  }

  private async receiveFoodData(): Promise<void> {
    this._foodData = await FoodService.receiveFood().getFoodById(
      this._context.foodId
    );
  }

  get food(): FoodModel {
    return this._foodData;
  }
}
