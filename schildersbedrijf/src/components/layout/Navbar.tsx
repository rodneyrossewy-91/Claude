'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Over Ons', href: '/over-ons' },
  { label: 'Diensten', href: '/diensten' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white shadow-md border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-3 h-3 rounded-full bg-yellow transition-transform duration-200 group-hover:scale-125" />
            <span
              className={`font-serif text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-anthracite'
              }`}
            >
              Van der Berg
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded transition-colors duration-200 ${
                    isTransparent
                      ? isActive
                        ? 'text-yellow'
                        : 'text-white/90 hover:text-white'
                      : isActive
                      ? 'text-blue font-semibold'
                      : 'text-gray-700 hover:text-blue'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-yellow text-anthracite text-sm font-semibold rounded hover:bg-yellow-dark transition-colors duration-200"
            >
              Gratis Offerte Aanvragen
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded transition-colors duration-200 ${
              isTransparent ? 'text-white' : 'text-anthracite'
            }`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Menu sluiten' : 'Menu openen'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 text-base font-medium rounded transition-colors duration-200 ${
                  isActive
                    ? 'text-blue bg-grey font-semibold'
                    : 'text-gray-700 hover:bg-grey hover:text-blue'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="mt-3 px-4 py-3 bg-yellow text-anthracite text-base font-semibold rounded text-center hover:bg-yellow-dark transition-colors duration-200"
          >
            Gratis Offerte Aanvragen
          </Link>
        </nav>
      </div>
    </header>
  );
}
