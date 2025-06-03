import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <Link
      href={href}
      className={clsx("hover:text-blue-500", isActive && "text-blue-500")}
    >
      {children}
    </Link>
  );
}

export function NavLinks() {
  return (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/fixtures-and-results">Fixtures and Results</NavLink>
      <NavLink href="/points-table">Points Table</NavLink>
    </>
  );
}
