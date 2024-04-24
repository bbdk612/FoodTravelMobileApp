import { NativeScriptConfig } from "@nativescript/core";

export default {
  id: "ru.ugrastudents.FoodTravelApp",
  appPath: "app",
  appResourcesPath: "App_Resources",
  android: {
    v8Flags: "--expose_gc",
    markingMode: "none",
  },
  cli: {
    packageManager: "npm",
  },
} as NativeScriptConfig;
