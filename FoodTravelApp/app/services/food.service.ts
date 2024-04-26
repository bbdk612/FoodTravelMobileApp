import { FirebaseOptions, firebase } from "@nativescript/firebase-core";
import "@nativescript/firebase-database";
import { FoodModel } from "~/models";

export class FoodService {
  private _foodData: string[];

  private static _food = new FoodService();

  // const config = new FirebaseOptions();
  // const secondaryApp = firebase.initializeApp(config, "SECONDARY_APP");
  // const database = firebase().database(secondaryApp);

  static receiveFood(): FoodService {
    this._food.allFoodData();
    return this._food;
  }

  private allFoodData(): void {
    firebase()
      .database()
      .ref("/Food")
      .on("value", (s) => {
        // console.log(s.numChildren());
        let foodObjs: string[] = [];
        s.forEach((c) => {
          foodObjs.push(c.key);
          return false;
        });
        console.log(foodObjs);
        this._foodData = foodObjs;
      });
  }

  get food(): string[] {
    return this._foodData;
  }

  async getFoodById(id: string): Promise<FoodModel> {
    let foodObj: FoodModel = await firebase()
      .database()
      .ref("/Food/" + id)
      .once("value")
      .then((snapshot) => {
        let values = snapshot.val();

        let obj = {
          id,
          title: String(values["name"]),
          description: String(values["description"]),
          photo: String(values["photoURL"]),
          price: Number(values["price"]),
          reustarantId: String(values["kitchenId"]),
        };

        return obj;
      })
      .catch((e) => {
        console.log(e);
        return undefined;
      });

    return foodObj;
  }
}
