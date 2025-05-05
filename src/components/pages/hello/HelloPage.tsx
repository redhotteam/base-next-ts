import { useTranslations } from "next-intl";

export default function HelloPage() {
  const t = useTranslations("hello-page");
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <h1 className="font-pacifico text-2xl font-bold">{t("title")}</h1>
      <h2 className="text-lg font-semibold">{t("subtitle")}</h2>
      <p className="text-center">{t("description")}</p>
    </div>
  );
}
