import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Share2, AtSign, Globe } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/over-ons", label: "Over Ons" },
  { href: "/diensten", label: "Diensten" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

const diensten = [
  { href: "/diensten#binnenschilderwerk", label: "Binnenschilderwerk" },
  { href: "/diensten#buitenschilderwerk", label: "Buitenschilderwerk" },
  { href: "/diensten#spuitwerk", label: "Spuitwerk" },
  { href: "/diensten#houtrot", label: "Houtrot Reparatie" },
];

export default function Footer() {
  return (
    <footer className="bg-anthracite text-white">
      {/* Paint stroke top */}
      <div className="relative h-16 bg-white overflow-hidden">
        <svg viewBox="0 0 1440 64" fill="none" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M0,0 L1440,0 L1440,30 C1200,60 960,10 720,40 C480,70 240,20 0,45 Z" fill="#1F2937"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#1F2937"/>
                </svg>
              </div>
              <div>
                <span className="font-bold text-xl text-white">
                  Schilder<span className="text-yellow">Pro</span>
                </span>
                <p className="text-xs text-gray-400">Vakmanschap in schilderwerk</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Meer dan 15 jaar ervaring in professioneel schilderwerk.
              Wij leveren kwaliteit met garantie voor woningen en bedrijven door heel Nederland.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 bg-white/10 hover:bg-yellow hover:text-anthracite text-white rounded-lg flex items-center justify-center transition-all duration-200">
                <Share2 size={16} />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 bg-white/10 hover:bg-yellow hover:text-anthracite text-white rounded-lg flex items-center justify-center transition-all duration-200">
                <AtSign size={16} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 bg-white/10 hover:bg-yellow hover:text-anthracite text-white rounded-lg flex items-center justify-center transition-all duration-200">
                <Globe size={16} />
              </a>
            </div>
          </div>

          {/* Navigatie */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Navigatie</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-yellow text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Diensten */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Diensten</h3>
            <ul className="space-y-2">
              {diensten.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-yellow text-sm transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+31612345678" className="flex items-center gap-3 text-gray-400 hover:text-yellow text-sm transition-colors duration-200">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={14} />
                  </div>
                  06-12345678
                </a>
              </li>
              <li>
                <a href="mailto:info@schilderpro.nl" className="flex items-center gap-3 text-gray-400 hover:text-yellow text-sm transition-colors duration-200">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={14} />
                  </div>
                  info@schilderpro.nl
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={14} />
                  </div>
                  <span>Verfstraat 12<br />1234 AB Amsterdam</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock size={14} />
                  </div>
                  <span>Ma-Vr: 07:00–18:00<br />Za: 08:00–14:00</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} SchilderPro. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-500 hover:text-yellow text-xs transition-colors duration-200">
              Privacyverklaring
            </Link>
            <Link href="/voorwaarden" className="text-gray-500 hover:text-yellow text-xs transition-colors duration-200">
              Algemene voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
