import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import { useContext } from "react";
import { CloseMenuContext } from "./Header";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isActive = router.pathname === href;
  const closeMenu = useContext(CloseMenuContext);

  return (
    <Link
      href={href}
      className={clsx("hover:text-blue-500", isActive && "text-blue-500")}
      onClick={() => {
        if (closeMenu) closeMenu();
      }}
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
