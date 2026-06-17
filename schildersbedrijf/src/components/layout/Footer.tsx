import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Over Ons', href: '/over-ons' },
  { label: 'Diensten', href: '/diensten' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
];

const serviceLinks = [
  { label: 'Binnenschilderwerk', href: '/diensten#binnenschilderwerk' },
  { label: 'Buitenschilderwerk', href: '/diensten#buitenschilderwerk' },
  { label: 'Spuitwerk', href: '/diensten#spuitwerk' },
  { label: 'Houtrot Reparatie', href: '/diensten#houtrot-reparatie' },
  { label: 'Gratis Offerte', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-anthracite text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo & socials */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-yellow" />
              <span className="font-serif text-xl font-bold">Van der Berg</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Vakmanschap in schilderwerk. Al meer dan 15 jaar uw betrouwbare partner voor alle
              schilder- en onderhoudswerkzaamheden.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-yellow hover:text-anthracite transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-yellow hover:text-anthracite transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-yellow hover:text-anthracite transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-serif text-base font-semibold mb-5 text-yellow">Navigatie</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-serif text-base font-semibold mb-5 text-yellow">Diensten</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div>
            <h3 className="font-serif text-base font-semibold mb-5 text-yellow">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+31302001234"
                  className="flex items-start gap-3 text-gray-300 hover:text-white text-sm transition-colors duration-200"
                >
                  <Phone size={16} className="mt-0.5 flex-shrink-0 text-yellow" />
                  <span>030 200 1234</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@vanderberg-schilders.nl"
                  className="flex items-start gap-3 text-gray-300 hover:text-white text-sm transition-colors duration-200"
                >
                  <Mail size={16} className="mt-0.5 flex-shrink-0 text-yellow" />
                  <span>info@vanderberg-schilders.nl</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-300 text-sm">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0 text-yellow" />
                  <span>
                    Schilderstraat 12
                    <br />
                    3511 AB Utrecht
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Van der Berg Schildersbedrijf. Alle rechten voorbehouden.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacyverklaring" className="hover:text-white transition-colors duration-200">
              Privacyverklaring
            </Link>
            <Link href="/algemene-voorwaarden" className="hover:text-white transition-colors duration-200">
              Algemene Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
