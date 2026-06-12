"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/over-ons", label: "Over Ons" },
  { href: "/diensten", label: "Diensten" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-deep rounded-lg flex items-center justify-center group-hover:bg-yellow transition-colors duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${scrolled ? "text-anthracite" : "text-white"}`}>
                  Schilder<span className="text-yellow">Pro</span>
                </span>
                <p className={`text-xs transition-colors duration-300 ${scrolled ? "text-gray-500" : "text-white/70"}`}>
                  Vakmanschap in schilderwerk
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-underline ${
                    pathname === link.href
                      ? scrolled
                        ? "text-blue-deep font-semibold"
                        : "text-yellow font-semibold"
                      : scrolled
                      ? "text-anthracite hover:text-blue-deep"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+31612345678"
                className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                  scrolled ? "text-anthracite hover:text-blue-deep" : "text-white/90 hover:text-white"
                }`}
              >
                <Phone size={16} />
                <span>06-12345678</span>
              </a>
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-2 bg-yellow hover:bg-yellow/90 text-anthracite font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-yellow/30 hover:-translate-y-0.5 text-sm"
              >
                Gratis Offerte Aanvragen
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  scrolled ? "text-anthracite hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-20 left-0 right-0 z-40 bg-white shadow-2xl border-b border-gray-100 lg:hidden overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      pathname === link.href
                        ? "bg-blue-deep text-white"
                        : "text-anthracite hover:bg-gray-light hover:text-blue-deep"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                <a href="tel:+31612345678" className="flex items-center gap-2 text-anthracite font-medium px-4">
                  <Phone size={18} className="text-blue-deep" />
                  06-12345678
                </a>
                <Link
                  href="/contact"
                  className="w-full text-center bg-yellow hover:bg-yellow/90 text-anthracite font-semibold px-5 py-3 rounded-lg transition-all duration-200"
                >
                  Gratis Offerte Aanvragen
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
