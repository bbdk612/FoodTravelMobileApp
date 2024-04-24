import { NavigatedData, Page } from "@nativescript/core";
import { FoodViewModel } from "./food-view-model";

export function navigatingTo(args: NavigatedData): void {
  const page = <Page>args.object;
  page.bindingContext = new FoodViewModel(page.navigationContext);
}
