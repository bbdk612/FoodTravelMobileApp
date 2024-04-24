import { UserModel } from "~/models";

export class UserService {
  private _userData: UserModel = {
    first_name: "",
    second_name: "",
    token: "",
    address: "",
  };

  // constructor() {

  // }

  private static _user = new UserService();

  static getUser(): UserService {
    return this._user;
  }

  get data(): UserModel {
    return this._userData;
  }

  login(): void {
    let userObj: UserModel = {
      first_name: "Хуимя",
      second_name: "Хуимия",
      token: "1dlkfjsjfls32sldks322235r",
      address: "г. Москва, ул. Пушкина, д. Колотушкина, кв. 8",
    };

    this._userData = userObj;
  }
}
