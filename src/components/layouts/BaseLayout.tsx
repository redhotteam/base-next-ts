import { ReactNode, Suspense } from "react";
import { Footer, Header, Preloader } from "@/components";

interface BaseLayoutProps {
  children: ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps): JSX.Element {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <Header />
      </Suspense>
      <main className="grow">
        <div className="relative mx-auto flex flex-col">{children}</div>
      </main>
      <Footer />
    </>
  );
}
