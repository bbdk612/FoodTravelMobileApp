import { ReustarantModel } from "~/models";

export class ReustarantService {
  private _reustarantData: ReustarantModel[] = [
    {
      id: 1,
      title: "ХачуХача",
      photo: "~/assets/hachuhacha.jpg",
      description:
        "Лучшая еда от равшана, что прямом вай пальчики оближешь, причем не только себе)))",
    },
    {
      id: 2,
      title: "ЕбаУеба",
      photo: "~/assets/ebaueba.jpg",
      description:
        "Если вашей девушки не выступят слезы счасться от нашего Куни Ли, то вам с ней не о чем больше разговаривать",
    },
  ];

  private static _reustarants = new ReustarantService();

  static receiveReustarants(): ReustarantService {
    return this._reustarants;
  }

  get reustarants(): ReustarantModel[] {
    return this._reustarantData;
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
