import { Frame, Observable } from "@nativescript/core";
import { UserService } from "~/services";

export class LoginViewModel extends Observable {
  constructor() {
    super();
  }

  onLoginButtonTap(): void {
    UserService.getUser().login();
    Frame.topmost().navigate({
      moduleName: "main/main-page",
    });
  }

  onRegistrationButtonTap(): void {
    UserService.getUser().login();
    Frame.topmost().navigate({
      moduleName: "registration/registration-page",
    });
  }
}
