"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

import { navigationItems } from "@/config/navigation.config";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="
          flex
          min-h-11
          min-w-11
          items-center
          justify-center
          rounded-full
          border
          border-white/20
          text-white
          transition
          hover:border-[var(--color-soft-gold)]
          hover:text-[var(--color-soft-gold)]
        "
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen ? (
        <div
          className="
            absolute
            left-4
            right-4
            top-20
            rounded-sm
            border
            border-white/10
            bg-[var(--color-deep-green)]
            p-5
            shadow-2xl
          "
        >
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col"
          >
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="
                  border-b
                  border-white/10
                  py-4
                  text-sm
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-white/85
                  last:border-b-0
                  hover:text-[var(--color-soft-gold)]
                "
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}