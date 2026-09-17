import { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/jobs", label: "Find Jobs" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#E4E7E2] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#1F6F5C] text-white">
            <Briefcase size={18} />
          </div>
          <span
            className="text-lg font-semibold text-[#171B26]"
            style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
          >
            JobPortal
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-[#5B6472] transition hover:text-[#171B26]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            to="/login"
            className="text-sm font-medium text-[#5B6472] transition hover:text-[#171B26]"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="rounded-md bg-[#E4572E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#cc4a25]"
          >
            Get started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-[#171B26] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#E4E7E2] bg-white px-4 pb-5 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-[#333A46] transition hover:bg-[#F3F5F1]"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-[#E4E7E2] pt-3">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-center text-sm font-medium text-[#333A46] hover:bg-[#F3F5F1]"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="rounded-md bg-[#E4572E] px-2 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#cc4a25]"
              >
                Get started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
