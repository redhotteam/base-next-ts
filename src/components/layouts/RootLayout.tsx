import "@/assets/styles/index.css";

import { ReactNode } from "react";
import Metrics from "@/app/metrics";
import { NextIntlClientProvider } from "next-intl";

export const metadata = {
  title: "",
  description: "",
  alternates: {
    locales: ["en", "uk"],
    hrefs: ["/en", "/uk"],
  },
};

interface RootLayoutProps {
  locale: string;
  messages: Record<string, unknown>;
  children: ReactNode;
}

export default async function RootLayout({
  locale,
  messages,
  children,
}: RootLayoutProps): Promise<JSX.Element> {
  return (
    <html lang={locale}>
      <body className="flex min-h-dvh flex-col justify-between">
        <NextIntlClientProvider messages={messages}>
          {children}
          <Metrics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
