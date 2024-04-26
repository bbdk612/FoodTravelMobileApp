import {
  Frame,
  ItemEventData,
  Observable,
  ObservableArray,
} from "@nativescript/core";
import { FoodModel, ReustarantModel, UserModel } from "~/models";
import { UserService } from "~/services";
import { FoodService, ReustarantService } from "~/services";

export class MainViewModel extends Observable {
  private _reustarantData: ReustarantModel[];
  private _foodData: FoodModel[];

  constructor() {
    super();
    this.receiveData();
  }

  private receiveData() {
    if (UserService.getUser().data.token != "") {
      this.receiveReustarants();
      this.receiveFood();
    } else {
      console.log("go to login");
      Frame.topmost().navigate({
        moduleName: "login/login-page",
      });
    }
  }

  private async receiveReustarants(): Promise<void> {
    let reustarantIds = ReustarantService.receiveReustarants().reustarantIds;
    reustarantIds.forEach(async (reustarantId) => {
      let reustarantObj =
        await ReustarantService.receiveReustarants().getReustarantById(
          reustarantId
        );
      this._reustarantData.push(reustarantObj);
    });
  }

  private async receiveFood(): Promise<void> {
    let foodIds = FoodService.receiveFood().foodIds;
    foodIds.forEach(async (foodIds) => {
      let foodObj = await FoodService.receiveFood().getFoodById(foodIds);
      this._foodData.push(foodObj);
    });
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
      context: { foodId: this._foodData[args.index] },
    });
  }
}
