import { NavigatedData, Page } from "@nativescript/core";
import { LoginViewModel } from "./login-view-model";

export function navigatingTo(args: NavigatedData): void {
    if (args.isBackNavigation) {
        return;
    }

    const page = <Page>args.object
    page.bindingContext = new LoginViewModel()
}