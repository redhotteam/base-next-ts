import { notFound } from "next/navigation";
import StoreProvider from "@/app/[locale]/provider";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import { RootLayout } from "@/components";


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default async function Layout({ children, params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <RootLayout messages={messages} locale={locale}>
      <StoreProvider>{children}</StoreProvider>
    </RootLayout>
  );
}
