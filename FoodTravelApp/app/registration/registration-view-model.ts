import { Frame, Observable } from "@nativescript/core";
import { UserService } from "~/services";

export class RegistrationViewModel extends Observable {
  constructor() {
    super();
  }

  onRegistrationTap(): void {
    UserService.getUser().login();
    Frame.topmost().navigate({
      moduleName: "main/main-page",
    });
  }
}
