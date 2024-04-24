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

  getReustarantById(id: number): ReustarantModel | undefined {
    return (
      this._reustarantData.find((restData) => restData.id === id) || undefined
    );
  }
}
