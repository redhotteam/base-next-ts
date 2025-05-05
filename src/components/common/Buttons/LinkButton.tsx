import Link from "next/link";

export default function Button({ className = "", children, href }) {
  return (
    <Link className={`flex w-full justify-center ${className}`} href={href}>
      {children}
    </Link>
  );
}
