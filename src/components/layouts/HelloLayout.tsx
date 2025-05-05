import { ReactNode } from "react";

interface HelloLayoutProps {
  children: ReactNode;
}

export default function HelloLayout({
  children,
}: HelloLayoutProps): JSX.Element {
  return (
    <main className="flex grow items-center">
      <div className="relative mx-auto flex flex-col">{children}</div>
    </main>
  );
}
