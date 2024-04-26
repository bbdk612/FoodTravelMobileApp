/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { Application } from "@nativescript/core";
import { firebase, FirebaseOptions } from "@nativescript/firebase-core";
import "@nativescript/firebase-database";

const defaultApp = await firebase().initializeApp();
const database = firebase().database();

Application.run({ moduleName: "app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
