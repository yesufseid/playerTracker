"use client"; // Needed to use React Context in Next.js App Router

import { Provider } from "react-redux";
import { store } from "../Redux/store"; // Adjust the path based on your project

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
