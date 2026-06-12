"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "Telefoon", value: "06-12345678", href: "tel:+31612345678", color: "from-blue-deep to-blue-light" },
  { icon: Mail, label: "E-mail", value: "info@schilderpro.nl", href: "mailto:info@schilderpro.nl", color: "from-amber-500 to-yellow" },
  { icon: MapPin, label: "Adres", value: "Verfstraat 12\n1234 AB Amsterdam", href: "#", color: "from-blue-deep to-blue-light" },
  { icon: Clock, label: "Openingstijden", value: "Ma-Vr: 07:00–18:00\nZa: 08:00–14:00", href: "#", color: "from-amber-500 to-yellow" },
];

const werkzaamhedenOpties = [
  "Binnenschilderwerk",
  "Buitenschilderwerk",
  "Spuitwerk",
  "Houtrot Reparatie",
  "Anders / Combinatie",
];

export default function ContactContent() {
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, margin: "-100px" });

  const [form, setForm] = useState({
    naam: "",
    telefoon: "",
    email: "",
    adres: "",
    werkzaamheden: "",
    bericht: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.naam.trim()) e.naam = "Naam is verplicht";
    if (!form.email.trim()) e.email = "E-mail is verplicht";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Ongeldig e-mailadres";
    if (!form.telefoon.trim()) e.telefoon = "Telefoonnummer is verplicht";
    if (!form.werkzaamheden) e.werkzaamheden = "Selecteer het type werkzaamheden";
    if (!form.bericht.trim()) e.bericht = "Bericht is verplicht";
    return e;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: "" }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-anthracite to-blue-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-yellow/20 border border-yellow/30 text-yellow px-4 py-2 rounded-full text-sm font-medium mb-6">
              Binnen 24 uur reactie
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Neem <span className="text-yellow">Contact</span> Op
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Vraag een gratis en vrijblijvende offerte aan of stel uw vragen. Wij reageren altijd binnen 24 uur.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C360,60 720,0 1080,40 C1260,55 1380,20 1440,30 L1440,60 L0,60 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-anthracite mb-8">Contactgegevens</h2>

              <div className="space-y-4 mb-10">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={info.label}
                      href={info.href}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-gray-light hover:bg-gray-medium transition-colors duration-200 group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{info.label}</div>
                        <div className="text-anthracite font-semibold text-sm whitespace-pre-line">{info.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-64 flex items-center justify-center relative">
                  <div className="text-center">
                    <MapPin size={48} className="text-blue-deep mx-auto mb-3 opacity-40" />
                    <p className="text-gray-500 text-sm font-medium">Verfstraat 12, 1234 AB Amsterdam</p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-blue-deep text-sm font-semibold hover:underline"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                  {/* Decorative grid */}
                  <div className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: "linear-gradient(rgba(30,58,138,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,138,0.15) 1px, transparent 1px)",
                      backgroundSize: "30px 30px",
                    }}
                  />
                </div>
              </div>

              {/* 24h badge */}
              <div className="mt-6 bg-gradient-to-r from-blue-deep to-blue-light rounded-2xl p-5 text-white flex items-center gap-4">
                <CheckCircle size={28} className="flex-shrink-0 text-yellow" />
                <div>
                  <div className="font-bold">Binnen 24 uur een reactie</div>
                  <div className="text-white/70 text-sm">Wij streven altijd naar snelle opvolging van uw aanvraag.</div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-anthracite mb-8">Offerte Aanvragen</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-100 rounded-2xl p-10 text-center"
                >
                  <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-anthracite mb-2">Bedankt voor uw bericht!</h3>
                  <p className="text-gray-600">Wij nemen binnen 24 uur contact met u op.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-anthracite mb-2" htmlFor="naam">Naam *</label>
                      <input
                        id="naam"
                        name="naam"
                        type="text"
                        value={form.naam}
                        onChange={handleChange}
                        placeholder="Uw volledige naam"
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-deep/20 focus:border-blue-deep ${errors.naam ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
                      />
                      {errors.naam && <p className="text-red-500 text-xs mt-1">{errors.naam}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-anthracite mb-2" htmlFor="telefoon">Telefoonnummer *</label>
                      <input
                        id="telefoon"
                        name="telefoon"
                        type="tel"
                        value={form.telefoon}
                        onChange={handleChange}
                        placeholder="06-XXXXXXXX"
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-deep/20 focus:border-blue-deep ${errors.telefoon ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
                      />
                      {errors.telefoon && <p className="text-red-500 text-xs mt-1">{errors.telefoon}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-anthracite mb-2" htmlFor="email">E-mailadres *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="uw@email.nl"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-deep/20 focus:border-blue-deep ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-anthracite mb-2" htmlFor="adres">Adres</label>
                    <input
                      id="adres"
                      name="adres"
                      type="text"
                      value={form.adres}
                      onChange={handleChange}
                      placeholder="Straatnaam 12, 1234 AB Stad"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-deep/20 focus:border-blue-deep"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-anthracite mb-2" htmlFor="werkzaamheden">Type werkzaamheden *</label>
                    <select
                      id="werkzaamheden"
                      name="werkzaamheden"
                      value={form.werkzaamheden}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-deep/20 focus:border-blue-deep bg-white ${errors.werkzaamheden ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    >
                      <option value="">Selecteer type werkzaamheden</option>
                      {werkzaamhedenOpties.map((o) => <option key={o}>{o}</option>)}
                    </select>
                    {errors.werkzaamheden && <p className="text-red-500 text-xs mt-1">{errors.werkzaamheden}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-anthracite mb-2" htmlFor="bericht">Bericht *</label>
                    <textarea
                      id="bericht"
                      name="bericht"
                      rows={5}
                      value={form.bericht}
                      onChange={handleChange}
                      placeholder="Vertel ons over uw project. Wat wilt u laten schilderen en wat zijn uw wensen?"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-deep/20 focus:border-blue-deep resize-none ${errors.bericht ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
                    />
                    {errors.bericht && <p className="text-red-500 text-xs mt-1">{errors.bericht}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-yellow hover:bg-yellow/90 disabled:opacity-70 text-anthracite font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow/30 hover:-translate-y-0.5 disabled:cursor-not-allowed text-base"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-anthracite/30 border-t-anthracite rounded-full animate-spin" />
                        Versturen...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Offerte Aanvragen
                      </>
                    )}
                  </button>

                  <p className="text-gray-400 text-xs text-center">
                    Door dit formulier in te sturen gaat u akkoord met onze{" "}
                    <a href="/privacy" className="text-blue-deep hover:underline">privacyverklaring</a>.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
