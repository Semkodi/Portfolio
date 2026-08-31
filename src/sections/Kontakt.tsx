import React, { useEffect, useState } from 'react';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { kontakt, profil } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';
import Reveal from '../components/Reveal';

export const Kontakt: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const [kopiert, setKopiert] = useState(false);
  const [zeit, setZeit] = useState('');
  const [form, setForm] = useState({ name: '', email: '', nachricht: '' });
  const [gesendet, setGesendet] = useState(false);

  useEffect(() => {
    const u = () =>
      setZeit(
        new Date().toLocaleTimeString(sprache === 'de' ? 'de-DE' : 'en-GB', {
          timeZone: 'Europe/Berlin',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      );
    u();
    const id = window.setInterval(u, 1000);
    return () => window.clearInterval(id);
  }, [sprache]);

  const kopieren = () => {
    navigator.clipboard?.writeText(profil.email);
    setKopiert(true);
    window.setTimeout(() => setKopiert(false), 2000);
  };

  const absenden = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.nachricht) return;
    window.location.href = `mailto:${profil.email}?subject=${encodeURIComponent(
      `Kontakt · ${form.name || 'Website'}`,
    )}&body=${encodeURIComponent(`${form.nachricht}\n\n— ${form.name} (${form.email})`)}`;
    setGesendet(true);
    window.setTimeout(() => setGesendet(false), 4000);
  };

  const feld =
    'w-full bg-transparent border-b border-[color:var(--color-line)] py-3 outline-none font-display text-xl sm:text-2xl placeholder:text-[color:var(--color-ink-faint)] focus:border-[color:var(--color-sienna)] transition-colors';

  return (
    <section id="kontakt" className="relative py-24 sm:py-36 px-5 sm:px-8 max-w-[1500px] mx-auto">
      <SektionKopf
        nummer="06"
        label={sprache === 'de' ? 'Kontakt' : 'Contact'}
        titel={
          <>
            {sprache === 'de' ? 'Sag' : 'Say'}{' '}
            <span className="italic-display text-[color:var(--color-sienna)]">{sprache === 'de' ? 'Hallo' : 'hello'}</span>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-6 space-y-8">
          <Reveal art="maske">
            <p className="font-display text-2xl sm:text-3xl leading-snug">{kontakt.text[sprache]}</p>
          </Reveal>

          <Reveal art="auf" delay={0.1}>
            <button
              onClick={kopieren}
              data-cursor
              className="group block text-left"
            >
              <div className="label mb-2">{sprache === 'de' ? 'E-Mail' : 'Email'}</div>
              <div className="font-display text-[7vw] sm:text-4xl lg:text-5xl leading-none link-unterstrich break-all">
                {profil.email}
              </div>
              <div className="font-mono-code text-xs text-[color:var(--color-ink-faint)] mt-2">
                {kopiert ? kontakt.kopiert[sprache] : `${kontakt.emailKopieren[sprache]} ↗`}
              </div>
            </button>
          </Reveal>

          <Reveal art="auf" delay={0.15} className="flex flex-wrap gap-x-8 gap-y-2 pt-4 regel font-mono-code text-xs">
            <a href={profil.github} target="_blank" rel="noopener noreferrer" className="link-unterstrich" data-cursor>
              GitHub ↗
            </a>
            <a href={profil.linkedin} target="_blank" rel="noopener noreferrer" className="link-unterstrich" data-cursor>
              LinkedIn ↗
            </a>
            <span className="text-[color:var(--color-ink-faint)]">
              {profil.standort[sprache]} · {kontakt.ortszeit[sprache]} {zeit || '––:––:––'}
            </span>
          </Reveal>
        </div>

        <Reveal art="blende" delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <form onSubmit={absenden} className="space-y-8">
            <input
              className={feld}
              placeholder={kontakt.formName[sprache]}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              required
              className={feld}
              placeholder={`${kontakt.formEmail[sprache]} *`}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <textarea
              required
              rows={3}
              className={`${feld} resize-none`}
              placeholder={`${kontakt.formNachricht[sprache]} *`}
              value={form.nachricht}
              onChange={(e) => setForm({ ...form, nachricht: e.target.value })}
            />
            <button
              type="submit"
              data-cursor
              className="font-mono-code text-sm tracking-widest uppercase border border-[color:var(--color-ink)] px-6 py-4 hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)] transition-colors"
            >
              {kontakt.formSenden[sprache]} →
            </button>
            {gesendet && (
              <p className="font-mono-code text-xs text-[color:var(--color-sienna)]">{kontakt.clientGeoeffnet[sprache]}</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Kontakt;
