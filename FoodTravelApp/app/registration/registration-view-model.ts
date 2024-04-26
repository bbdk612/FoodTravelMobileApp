import {
  Frame,
  ItemEventData,
  Observable,
  TextField,
} from "@nativescript/core";
import { UserProfileChangeRequest } from "@nativescript/firebase-auth";
import { UserService } from "~/services";

export class RegistrationViewModel extends Observable {
  private _email: string;
  private _password: string;
  private _passwordConfirm: string;
  private _phoneNumber: string;
  private _firstName: string;
  private _secondName: string;

  constructor() {
    super();
  }

  onEmailTextChange(args: ItemEventData): void {
    const textField = <TextField>args.object;
    this._email = textField.text;
  }

  onPhoneNumberTextChange(args: ItemEventData): void {
    const textField = <TextField>args.object;
    this._phoneNumber = textField.text;
  }

  onFirstNameTextChange(args: ItemEventData): void {
    const textField = <TextField>args.object;
    this._firstName = textField.text;
  }

  onSecondTextChange(args: ItemEventData): void {
    const textField = <TextField>args.object;
    this._secondName = textField.text;
  }

  onPassConfirmTextChange(args: ItemEventData): void {
    const textField = <TextField>args.object;
    this._passwordConfirm = textField.text;
  }

  onPassTextChange(args: ItemEventData): void {
    const textField = <TextField>args.object;
    this._password = textField.text;
  }

  async onRegistrationTap(): Promise<void> {
    let userData: UserProfileChangeRequest = {
      displayName: this._firstName + " " + this._secondName,
    };

    let completed = await UserService.getUser().register(
      this._email,
      this._password,
      this._passwordConfirm,
      this._phoneNumber,
      userData
    );

    if (completed) {
      Frame.topmost().navigate({
        moduleName: "main/main-page",
      });
    } else {
      alert("Try again. Something was wrong");
    }
  }
}
