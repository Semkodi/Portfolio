import React, { useEffect, useState } from 'react';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { kontakt, profil } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';
import Reveal from '../components/Reveal';

export const Kontakt: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const [kopiert, setzeKopiert] = useState(false);
  const [zeit, setzeZeit] = useState('');
  const [form, setzeForm] = useState({ name: '', email: '', nachricht: '' });
  const [gesendet, setzeGesendet] = useState(false);

  useEffect(() => {
    const aktualisiere = () =>
      setzeZeit(
        new Date().toLocaleTimeString(sprache === 'de' ? 'de-DE' : 'en-GB', {
          timeZone: 'Europe/Berlin',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      );
    aktualisiere();
    const id = window.setInterval(aktualisiere, 1000);
    return () => window.clearInterval(id);
  }, [sprache]);

  const kopieren = () => {
    navigator.clipboard?.writeText(profil.email);
    setzeKopiert(true);
    window.setTimeout(() => setzeKopiert(false), 2000);
  };

  const absenden = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.nachricht) return;
    window.location.href = `mailto:${profil.email}?subject=${encodeURIComponent(
      `Kontakt · ${form.name || 'Website'}`,
    )}&body=${encodeURIComponent(`${form.nachricht}\n\n— ${form.name} (${form.email})`)}`;
    setzeGesendet(true);
    window.setTimeout(() => setzeGesendet(false), 4000);
  };

  const feld =
    'w-full border-b border-linie bg-transparent py-3 text-[17px] outline-none transition-colors placeholder:text-text-3 focus:border-signal';

  return (
    <section id="kontakt" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SektionKopf
        nummer="07"
        label={sprache === 'de' ? 'Kontakt' : 'Contact'}
        rechts={`${kontakt.ortszeit[sprache]} ${zeit || '––:––:––'}`}
      />

      <Reveal art="auf">
        <div className="overflow-hidden border border-linie bg-text/[0.025]">
          <div className="flex items-center gap-2.5 border-b border-linie px-4 py-3 font-mono-code text-[11px] text-text-3">
            <span className="h-2 w-2 rounded-full bg-signal" />
            {sprache === 'de' ? 'kontakt — bash' : 'contact — bash'}
          </div>

          <div className="grid grid-cols-1 gap-10 p-6 sm:p-9 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col gap-6 lg:col-span-6">
              <p className="font-mono-code text-[13.5px] text-text-3">
                <span className="text-signal">semir@portfolio</span>
                :~$ kontakt --neue-aufgabe
              </p>

              <button type="button" onClick={kopieren} data-cursor className="group block text-left">
                <span className="block font-mono-code text-[clamp(1.25rem,3.2vw,2.25rem)] leading-tight font-normal tracking-[-0.02em] break-all">
                  {profil.email}
                  <span
                    aria-hidden
                    className="ml-2 inline-block h-[0.85em] w-[0.45em] translate-y-[0.08em] animate-caret bg-signal align-baseline"
                  />
                </span>
                <span className="mt-2.5 block font-mono-code text-[11.5px] text-text-3 transition-colors group-hover:text-text-2">
                  {kopiert ? kontakt.kopiert[sprache] : `${kontakt.emailKopieren[sprache]} ↗`}
                </span>
              </button>

              <p className="max-w-[52ch] text-[15.5px] leading-[1.7] text-text-2">
                {kontakt.text[sprache]}
              </p>

              <div className="flex flex-wrap gap-x-7 gap-y-2 border-t border-linie pt-5 font-mono-code text-[11.5px]">
                <a
                  href={profil.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-unterstrich text-text-2"
                  data-cursor
                >
                  GitHub ↗
                </a>
                <a
                  href={profil.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-unterstrich text-text-2"
                  data-cursor
                >
                  LinkedIn ↗
                </a>
                <span className="text-text-3">{profil.standort[sprache]}</span>
              </div>
            </div>

            <form onSubmit={absenden} className="flex flex-col gap-7 lg:col-span-5 lg:col-start-8">
              <input
                className={feld}
                placeholder={kontakt.formName[sprache]}
                aria-label={kontakt.formName[sprache]}
                value={form.name}
                onChange={(e) => setzeForm({ ...form, name: e.target.value })}
              />
              <input
                type="email"
                required
                className={feld}
                placeholder={`${kontakt.formEmail[sprache]} *`}
                aria-label={kontakt.formEmail[sprache]}
                value={form.email}
                onChange={(e) => setzeForm({ ...form, email: e.target.value })}
              />
              <textarea
                required
                rows={3}
                className={`${feld} resize-none`}
                placeholder={`${kontakt.formNachricht[sprache]} *`}
                aria-label={kontakt.formNachricht[sprache]}
                value={form.nachricht}
                onChange={(e) => setzeForm({ ...form, nachricht: e.target.value })}
              />
              <button
                type="submit"
                data-cursor
                className="self-start bg-signal px-6 py-4 font-mono-code text-xs tracking-[0.12em] uppercase text-signal-tief transition-colors hover:bg-[#ffb066]"
              >
                {kontakt.formSenden[sprache]} →
              </button>
              {gesendet && (
                <p role="status" className="font-mono-code text-[11.5px] text-signal">
                  {kontakt.clientGeoeffnet[sprache]}
                </p>
              )}
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Kontakt;
