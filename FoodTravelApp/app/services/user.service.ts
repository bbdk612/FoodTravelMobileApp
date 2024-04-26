import { firebase } from "@nativescript/firebase-core";
import "@nativescript/firebase-database";
import "@nativescript/firebase-auth";
import { UserModel } from "~/models";
import {
  UserCredential,
  UserProfileChangeRequest,
} from "@nativescript/firebase-auth";

export class UserService {
  private _userData: UserModel = {
    first_name: "",
    second_name: "",
    token: "",
    address: "",
  };

  constructor() { }

  private static _user = new UserService();

  static getUser(): UserService {
    return this._user;
  }

  get data(): UserModel {
    return this._userData;
  }

  async login(email: string, password: string): Promise<boolean> {
    let userObj: UserModel = {
      first_name: "Хуимя",
      second_name: "Хуимия",
      token: "1dlkfjsjfls32sldks322235r",
      address: "г. Москва, ул. Пушкина, д. Колотушкина, кв. 8",
    };

    this._userData = userObj;

    let completed = await firebase()
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userObj: UserCredential) => {
        let tocken: string = await userObj.user.getIdToken();
        console.log(tocken);
        console.log("auth completed");
        return true;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });

    return completed;
  }

  async register(
    email: string,
    password: string,
    passwordConfirm: string,
    phoneNumber: string,
    userData: UserProfileChangeRequest
  ): Promise<boolean> {
    if (password !== passwordConfirm) {
      return false;
    }

    let completed = await firebase()
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userObj: UserCredential) => {
        let uid: string = userObj.user.uid;
        // userObj.user.updateProfile(userData);
        firebase()
          .database()
          .ref("/Users/" + uid)
          .update({
            email: email,
            password: password,
            name: userData.displayName,
            phone: phoneNumber,
            role: "manager",
          })
          .then(() => {
            console.log("zbs");
          })
          .catch((e) => console.log(e));
        // userObj.user.updatePhoneNumber(phoneNumber);
        // console.log(uid);
        // console.log("auth completed");
        return true;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });

    return completed;
  }
}
