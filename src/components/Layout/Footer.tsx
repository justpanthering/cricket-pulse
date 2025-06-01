import { NavLinks } from "./NavLinks";

export function Footer() {
  return (
    <footer className="bg-black text-white px-6 pt-8 pb-4">
      <div className="flex justify-center">
        {/* Contact Details */}
        <div className="container">
          <h2 className="text-lg font-semibold mb-2">Contact</h2>
          <p>
            Email:&nbsp;
            <a href="mailto:contact@cricketpulse.com" className="underline">
              contact@cricketpulse.com
            </a>
          </p>
          <p>
            Phone:&nbsp;
            <a href="tel:+1234567890" className="underline">
              +1 234 567 890
            </a>
          </p>
          <p>Address: 123 Cricket Lane, Sports City</p>
        </div>
      </div>
      {/* Nav Links at the bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:items-center gap-2">
        <nav className="flex flex-col md:flex-row gap-6">
          <NavLinks />
        </nav>
        <span className="text-xs text-gray-400 mt-2">
          &copy; {new Date().getFullYear()} Cricket Pulse. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
