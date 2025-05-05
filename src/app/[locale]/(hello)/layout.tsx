import "@/assets/styles/index.css";

import { HelloLayout } from "@/components";

export const metadata = {
  title: "",
  description: "",
};

export default function Layout({ children }) {
  return <HelloLayout>{children}</HelloLayout>;
}
