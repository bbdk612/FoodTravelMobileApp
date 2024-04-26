import { FirebaseOptions, firebase } from "@nativescript/firebase-core";
import "@nativescript/firebase-database";
import { OrderModel } from "~/models";

export class OrderService {
  private _orderIds: string[];

  private static _order = new OrderService();

  // const config = new FirebaseOptions();
  // const secondaryApp = firebase.initializeApp(config, "SECONDARY_APP");
  // const database = firebase().database(secondaryApp);

  static receiveOrder(): OrderService {
    this._order.allOrderData();
    return this._order;
  }

  private allOrderData(): void {
    firebase()
      .database()
      .ref("/Order")
      .on("value", (s) => {
        // console.log(s.numChildren());
        let orderObjs: string[] = [];
        s.forEach((c) => {
          orderObjs.push(c.key);
          return false;
        });
        console.log(orderObjs);
        this._orderIds = orderObjs;
      });
  }

  get orderIds(): string[] {
    return this._orderIds;
  }

  async updateOrder(order: OrderModel): Promise<boolean> {
    firebase()
      .database()
      .ref(`/Order/${order.id}`)
      .set({
        price: order.price,
        kitchenId: order.reustarantId,
      })
      .then(() => {
        return true;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
    return false;
  }

  async getOrderById(id: string): Promise<OrderModel> {
    let orderObj: OrderModel = await firebase()
      .database()
      .ref("/Order/" + id)
      .once("value")
      .then((snapshot) => {
        let values = snapshot.val();

        let obj = {
          id,
          price: Number(values["price"]),
          reustarantId: String(values["kitchenId"]),
        };

        return obj;
      })
      .catch((e) => {
        console.log(e);
        return undefined;
      });

    return orderObj;
  }
}
