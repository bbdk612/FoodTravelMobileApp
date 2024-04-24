import { NavigatedData, Page } from "@nativescript/core";
import { ReustarantViewModel } from "./reustarant-view-model";

export function navigatingTo(args: NavigatedData): void {
  const page = <Page>args.object;
  page.bindingContext = new ReustarantViewModel(page.navigationContext);
}
