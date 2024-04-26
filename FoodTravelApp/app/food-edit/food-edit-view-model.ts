import {
  Frame,
  ItemEventData,
  Observable,
  TextField,
  TextView,
} from "@nativescript/core";
import { FoodModel } from "~/models";
import { FoodService } from "~/services";

export class FoodEditViewModel extends Observable {
  private _title: string;
  private _imageUrl: string;
  private _description: string;
  private _price: number;
  private _food: FoodModel;

  constructor(private _context: { foodId: string }) {
    super();

    this._food = FoodService.receiveFood().findFoodById(this._context.foodId);
  }

  onTitleTextChange(args: ItemEventData): void {
    const textField = <TextField>args.view;
    this._title = textField.text;
  }

  onDescTextChange(args: ItemEventData): void {
    const textField = <TextView>args.view;
    this._description = textField.text;
  }

  onImageUrlTextChange(args: ItemEventData): void {
    const textField = <TextField>args.view;
    this._imageUrl = textField.text;
  }

  onPriceTextChange(args: ItemEventData): void {
    const textField = <TextField>args.view;
    this._price = Number(textField.text);
  }

  onSaveButtonTap(args: ItemEventData): void {
    let newFoodData: FoodModel = {
      id: this._context.foodId,
      title: this._title,
      description: this._description,
      price: this._price,
      photo: this._imageUrl,
    };

    // FoodService.receiveFood().updateFoodById();
    Frame.topmost().navigate({
      moduleName: "food/food-page",
      context: { foodId: this._context.foodId },
    });
  }
}
