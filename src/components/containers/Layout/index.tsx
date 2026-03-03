import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={"layout"} id="layout">
      {children}
    </div>
  );
}
