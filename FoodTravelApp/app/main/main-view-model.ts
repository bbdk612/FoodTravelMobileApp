import {
  Frame,
  ItemEventData,
  Observable,
  ObservableArray,
} from "@nativescript/core";
import { FoodModel, ReustarantModel, UserModel } from "~/models";
import { UserService } from "~/services";
import { FoodService } from "~/services/food.service";
import { ReustarantService } from "~/services/reustarant.service";

export class MainViewModel extends Observable {
  private _reustarantData: ReustarantModel[];
  private _foodData: FoodModel[];

  constructor() {
    super();
    this.receiveData();
  }

  private receiveData() {
    if (UserService.getUser().data.token != "") {
      this._reustarantData = ReustarantService.receiveReustarants().reustarants;
      this._foodData = FoodService.receiveFood().food;
    } else {
      console.log("go to login");
      Frame.topmost().navigate({
        moduleName: "login/login-page",
      });
    }
  }

  get reustarants(): ObservableArray<ReustarantModel> {
    return new ObservableArray(this._reustarantData);
  }

  onReustarantTap(args: ItemEventData): void {
    Frame.topmost().navigate({
      moduleName: "reustarant/reustarant-page",
      context: { reustarantId: this._reustarantData[args.index].id },
    });
  }

  get food(): FoodModel[] {
    return this._foodData;
  }

  onFoodTap(args: ItemEventData): void {
    Frame.topmost().navigate({
      moduleName: "food/food-page",
      context: { foodId: this._foodData[args.index].id },
    });
  }
}
