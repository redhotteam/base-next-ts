export default function sitemap() {
  const baseUrl = "";
  const locales = ["en", "uk"];
  const pages = ["", "designs", "services", "faqs", "contact-us"];

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page ? `/${page}` : ""}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? "daily" : "weekly",
      priority: page === "" ? 1.0 : 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en${page ? `/${page}` : ""}`,
          uk: `${baseUrl}/uk${page ? `/${page}` : ""}`,
        },
      },
    })),
  );
}
