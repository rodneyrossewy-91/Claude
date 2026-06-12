'use client';
import { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

const serviceOptions = ['Binnenschilderwerk', 'Buitenschilderwerk', 'Spuitwerk', 'Houtrot Reparatie', 'Kleuradvies', 'Anders'];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: FormData) {
    const errs: Record<string, string> = {};
    if (!data.get('naam')) errs.naam = 'Naam is verplicht';
    if (!data.get('telefoon')) errs.telefoon = 'Telefoonnummer is verplicht';
    const email = data.get('email') as string;
    if (!email) errs.email = 'E-mail is verplicht';
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) errs.email = 'Voer een geldig e-mailadres in';
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs = validate(data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1400));
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-green-600" aria-hidden="true" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#1F2937] mb-3">Aanvraag ontvangen!</h3>
        <p className="text-[#6B7280]">Bedankt voor uw aanvraag. Wij nemen binnen 24 uur contact met u op.</p>
      </div>
    );
  }

  const inputCls = (field: string) => `w-full px-4 py-3 border rounded-xl text-[#1F2937] text-sm transition-colors outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent ${errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="naam" className="block text-sm font-semibold text-[#1F2937] mb-2">Naam <span className="text-red-400" aria-hidden="true">*</span></label>
          <input id="naam" name="naam" type="text" autoComplete="name" placeholder="Jan de Vries" className={inputCls('naam')} />
          {errors.naam && <p className="text-red-500 text-xs mt-1" role="alert">{errors.naam}</p>}
        </div>
        <div>
          <label htmlFor="telefoon" className="block text-sm font-semibold text-[#1F2937] mb-2">Telefoonnummer <span className="text-red-400" aria-hidden="true">*</span></label>
          <input id="telefoon" name="telefoon" type="tel" autoComplete="tel" placeholder="06 12345678" className={inputCls('telefoon')} />
          {errors.telefoon && <p className="text-red-500 text-xs mt-1" role="alert">{errors.telefoon}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-[#1F2937] mb-2">E-mailadres <span className="text-red-400" aria-hidden="true">*</span></label>
        <input id="email" name="email" type="email" autoComplete="email" placeholder="jan@voorbeeld.nl" className={inputCls('email')} />
        {errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="adres" className="block text-sm font-semibold text-[#1F2937] mb-2">Adres werkzaamheden</label>
        <input id="adres" name="adres" type="text" autoComplete="street-address" placeholder="Straatnaam 1, Plaatsnaam" className={inputCls('adres')} />
      </div>
      <div>
        <label htmlFor="dienst" className="block text-sm font-semibold text-[#1F2937] mb-2">Type werkzaamheden</label>
        <select id="dienst" name="dienst" className={inputCls('dienst')}>
          <option value="">Selecteer een dienst...</option>
          {serviceOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="bericht" className="block text-sm font-semibold text-[#1F2937] mb-2">Bericht</label>
        <textarea id="bericht" name="bericht" rows={4} placeholder="Beschrijf uw project of stel uw vraag..." className={`${inputCls('bericht')} resize-none`} />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#1E3A8A] text-white font-bold py-4 px-6 rounded-xl hover:bg-[#1e40af] transition-all duration-200 hover:-translate-y-0.5 shadow-md hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 cursor-pointer"
      >
        {status === 'loading' ? (
          <><Loader2 size={18} className="animate-spin" aria-hidden="true" /> Aanvraag versturen...</>
        ) : 'Verstuur Aanvraag'}
      </button>
      <p className="text-center text-xs text-[#9CA3AF]">U ontvangt binnen 24 uur een reactie. Geen verplichtingen.</p>
    </form>
  );
}
