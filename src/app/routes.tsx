import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Landing } from "./components/Landing";
import { InnerAppShellAndEntryHub } from "./components/InnerAppShellAndEntryHub";
import { Builder } from "./components/Builder";
import { StaticInventoryManager } from "./components/StaticInventoryManager";
import { Wizard } from "./components/Wizard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Landing },
    ],
  },
  {
    path: "/hub",
    Component: InnerAppShellAndEntryHub,
  },
  {
    path: "/builder",
    Component: Builder,
  },
  {
    path: "/inventory",
    Component: StaticInventoryManager,
  },
  {
    path: "/wizard",
    Component: Wizard,
  }
]);
