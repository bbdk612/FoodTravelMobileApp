import { ItemEventData, Observable } from "@nativescript/core";
import { FoodService, UserService } from "~/services";

export class PoligonViewModel extends Observable {
  constructor() {
    super();
  }

  async onTestTap(): Promise<void> {
    await UserService.getUser().login("pidor@mail.com", "123456");
    let food = FoodService.receiveFood().food;
    console.log(food);
  }
}
