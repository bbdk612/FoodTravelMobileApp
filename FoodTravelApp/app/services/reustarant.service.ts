import { firebase } from "@nativescript/firebase-core";
import { ReustarantModel } from "~/models";

export class ReustarantService {
  private _reustarantIds: string[];

  private static _reustarants = new ReustarantService();

  static receiveReustarants(): ReustarantService {
    this._reustarants.receiveReustarantIds();
    return this._reustarants;
  }

  private receiveReustarantIds(): void {
    firebase()
      .database()
      .ref("/Kitchen")
      .on("value", (s) => {
        s.forEach((c) => {
          this._reustarantIds.push(c.key);
          return false;
        });
      });
  }

  get reustarantIds(): string[] {
    return this._reustarantIds;
  }

  async updateReustarant(reustarant: ReustarantModel): Promise<boolean> {
    firebase()
      .database()
      .ref(`/Kitchen/${reustarant.id}`)
      .set({
        name: reustarant.title,
        description: reustarant.description,
        photoURL: reustarant.photo,
        phoneNum: reustarant.phoneNum,
        adress: reustarant.adress,
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

  async getReustarantById(id: string): Promise<ReustarantModel> {
    let reustarantObj: ReustarantModel = await firebase()
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
          phoneNum: String(values["phoneNum"]),
          adress: String(values["adress"]),
        };

        return obj;
      })
      .catch((e) => {
        console.log(e);
        return undefined;
      });

    return reustarantObj;
  }
}
