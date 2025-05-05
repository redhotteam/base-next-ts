"use client";

import { routing, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function LangSwitcher() {
  const locales = routing.locales;
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onLangChange = (selectedLocale) => {
    // Очищаємо локаль із pathname
    let cleanPathname = pathname;
    routing.locales.forEach((loc) => {
      const regex = new RegExp(`^/${loc}(/|$)`);
      cleanPathname = cleanPathname.replace(regex, "/");
    });

    // Додаємо "/" якщо cleanPathname порожній
    if (!cleanPathname) cleanPathname = "/";

    console.log("Switching to locale:", selectedLocale, "Path:", cleanPathname);
    router.push(cleanPathname, { locale: selectedLocale });
  };

  console.log("Current locale:", locale, "Pathname:", pathname);

  return (
    <div className="flex gap-2">
      {locales.map((item, index) => (
        <div key={index} className="rounded-full border p-2">
          <button
            className={`cursor-pointer ${locale === item ? "text-red-600" : "text-black"}`}
            onClick={() => onLangChange(item)}
            disabled={locale === item}
          >
            {item.toUpperCase()}
          </button>
        </div>
      ))}
    </div>
  );
}