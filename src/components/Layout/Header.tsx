import { useState, createContext } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { NavLinks } from "./NavLinks";

export const CloseMenuContext = createContext<(() => void) | undefined>(
  undefined
);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="flex justify-center px-4 py-4 bg-[#f8f9fa] border-b border-[#eaeaea] text-gray-800 shadow-md">
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/">
            <span className="mr-3 text-2xl">Cricket Pulse</span>
          </Link>
        </div>
        <div className="hidden md:flex gap-6">
          <NavLinks />
        </div>
        {/* Hamburger Menu Button */}
        <button
          className="md:hidden flex items-center cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>
      <div
        className={clsx(
          "fixed inset-0 z-20 transition-all duration-300 md:hidden",
          menuOpen ? "visible" : "pointer-events-none"
        )}
      >
        {/* Overlay */}
        <div
          className={clsx(
            "absolute inset-0 bg-black transition-opacity duration-300",
            menuOpen ? "opacity-50" : "opacity-0"
          )}
          onClick={closeMenu}
        />
        {/* Side Menu */}
        <div
          className={clsx(
            "absolute top-0 left-0 h-full w-64 bg-[#f8f9fa] border-r border-[#eaeaea] shadow-lg transition-transform duration-300 flex flex-col gap-4 py-8 px-6",
            menuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Close Side Menu Button */}
          <button className="self-end mb-6 cursor-pointer" onClick={closeMenu}>
            <X size={24} />
          </button>
          <CloseMenuContext.Provider value={closeMenu}>
            <NavLinks />
          </CloseMenuContext.Provider>
        </div>
      </div>
    </nav>
  );
}
