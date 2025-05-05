import path from "path";
import { fileURLToPath } from "url";

import * as dotenv from "dotenv";
import createNextIntlPlugin from "next-intl/plugin";

const { NEXT_PUBLIC_BACKEND_URL, NEXT_PUBLIC_MICROSOFT_CLARITY } =
  dotenv.config({
    path: `./.env.${process.env.APP_ENV}`,
  }).parsed || {};
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_MICROSOFT_CLARITY,
  },
};

export default withNextIntl(nextConfig);
