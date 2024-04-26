import { NavigatedData, Page } from "@nativescript/core";
import { OrderViewModel } from "./order-view-model";

export function navigatingTo(args: NavigatedData): void {
  const page = <Page>args.object;
  page.bindingContext = new OrderViewModel(page.navigationContext);
}
