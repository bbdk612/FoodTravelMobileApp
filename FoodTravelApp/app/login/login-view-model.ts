import {
  Frame,
  ItemEventData,
  Observable,
  TextField,
} from "@nativescript/core";
import { UserService } from "~/services";

export class LoginViewModel extends Observable {
  private _email: string;
  private _password: string;

  constructor() {
    super();
  }

  onEmailTextChange(args: ItemEventData): void {
    const textField = <TextField>args.object;
    this._email = textField.text;
  }

  onPassTextChange(args: ItemEventData): void {
    const textField = <TextField>args.object;
    this._password = textField.text;
  }

  async onLoginButtonTap(args: ItemEventData): Promise<void> {
    console.log(this._email);
    console.log(this._password);
    let completed = await UserService.getUser().login(
      this._email,
      this._password
    );
    if (completed) {
      Frame.topmost().navigate({
        moduleName: "main/main-page",
      });
    } else {
      alert("Password or email is incorrect");
    }
  }

  onRegistrationButtonTap(): void {
    Frame.topmost().navigate({
      moduleName: "registration/registration-page",
    });
  }
}
