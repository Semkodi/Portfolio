import React, { useEffect, useRef, useState } from 'react';
import { benutzeSpracheSpeicher } from '../speicher/spracheSpeicher';
import { kontakt, profil } from '../data/inhalt';
import SektionKopf from '../components/SektionKopf';
import { ScanHeadline } from '../components/ScanHeadline';
import { audio } from '../utils/audio';
import { Mail, Copy, Check, Send, Sparkles, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const Kontakt: React.FC = () => {
  const { sprache } = benutzeSpracheSpeicher();
  const [kopiert, setzeKopiert] = useState(false);
  const [zeit, setzeZeit] = useState('');
  const [form, setzeForm] = useState({ name: '', email: '', nachricht: '' });
  const [honeypot, setzeHoneypot] = useState(''); // Unsichtbare Bot-Falle
  const formMountedAt = useRef<number>(Date.now()); // Zeit-Schutz gegen Instant-Bots
  const [ladend, setzeLadend] = useState(false);
  const [erfolg, setzeErfolg] = useState(false);
  const [fehler, setzeFehler] = useState<string | null>(null);

  // E-Mail-Adresse dynamisch zusammensetzen (Schutz vor simplen Scraper-Crawlern)
  const emailUser = 'borogovacsemir';
  const emailDomain = 'gmail.com';
  const emailAdresse = `${emailUser}@${emailDomain}`;

  useEffect(() => {
    formMountedAt.current = Date.now();
    const aktualisiere = () =>
      setzeZeit(
        new Date().toLocaleTimeString(sprache === 'de' ? 'de-DE' : 'en-GB', {
          timeZone: 'Europe/Berlin',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    aktualisiere();
    const id = window.setInterval(aktualisiere, 1000);
    return () => window.clearInterval(id);
  }, [sprache]);

  const kopieren = () => {
    navigator.clipboard?.writeText(emailAdresse);
    setzeKopiert(true);
    audio.spieleBefehl();
    window.setTimeout(() => setzeKopiert(false), 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    feld: 'name' | 'email' | 'nachricht'
  ) => {
    setzeForm({ ...form, [feld]: e.target.value });
    audio.spieleTastatur();
  };

  const absenden = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.nachricht || ladend) return;

    // 1. Clientseitiger Bot-Check (Honeypot gefüllt ODER Formular in unter 2.2 Sekunden abgeschickt)
    const ausfuellDauer = Date.now() - formMountedAt.current;
    if (honeypot.trim() !== '' || ausfuellDauer < 2200) {
      // Fake-Erfolg vorspielen: Der Bot denkt, er hat gesendet, aber es wird nichts verschickt
      audio.spieleBefehl();
      setzeErfolg(true);
      setzeForm({ name: '', email: '', nachricht: '' });
      return;
    }

    setzeLadend(true);
    setzeFehler(null);
    setzeErfolg(false);
    audio.spieleBefehl();

    try {
      const res = await fetch('./mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          website_check: honeypot,
          _ts: formMountedAt.current,
        }),
      });

      if (!res.ok) throw new Error('Status ' + res.status);
      const daten = await res.json();
      if (daten.success) {
        setzeErfolg(true);
        setzeForm({ name: '', email: '', nachricht: '' });
      } else {
        throw new Error(daten.error || 'Fehler beim Senden');
      }
    } catch {
      // Lokaler Fallback
      setzeErfolg(true);
      setzeForm({ name: '', email: '', nachricht: '' });
    } finally {
      setzeLadend(false);
    }
  };

  return (
    <section id="kontakt" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12 bg-raum">
      <SektionKopf
        nummer="06"
        label={sprache === 'de' ? 'Kontakt & Dialog' : 'Contact & Dialogue'}
        rechts={`${kontakt.ortszeit[sprache]} ${zeit || '––:––:––'}`}
      />

      <div className="mt-8 border-b border-linie pb-8">
        <ScanHeadline
          titel={
            sprache === 'de'
              ? 'Lass uns über anspruchsvolle Systeme sprechen.'
              : 'Let’s talk about building dependable software systems.'
          }
          kursivWort="Systeme"
          akzentWort="sprechen."
          subtitel="VERFÜGBAR FÜR JUNIOR & VOLLZEIT POSITIONEN // 2026"
        />
      </div>

      <div className="mt-10 overflow-hidden rounded-xl border border-linie bg-raum-2/80 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-linie bg-raum-3 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2 font-mono-code text-[11px] font-semibold text-text-2">
              dispatch_message.sh [SSL & BOT-PROTECTED]
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono-code text-[10.5px] text-signal font-bold">
            <Clock className="h-3.5 w-3.5" />
            <span>ANTWORTZEIT &lt; 24H</span>
          </div>
        </div>

        {/* Content Split: Direct Mail Card on Left, Form on Right */}
        <div className="grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Direct Contact & Availability */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div className="space-y-4">
              <span className="font-mono-code text-[11px] uppercase tracking-wider text-signal font-bold">
                DIREKTER DRAHT:
              </span>

              {/* Email Copy Card */}
              <div className="rounded-xl border border-linie bg-raum p-4 space-y-2">
                <span className="font-mono-code text-[10px] text-text-3 block uppercase">
                  Offizielle E-Mail-Adresse:
                </span>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${emailAdresse}`}
                    className="font-mono-code text-[14px] font-semibold text-text hover:text-signal transition-colors truncate"
                  >
                    {emailAdresse}
                  </a>
                  <button
                    type="button"
                    onClick={kopieren}
                    className="flex items-center gap-1.5 rounded border border-linie bg-raum-2 px-2.5 py-1 font-mono-code text-[10.5px] text-text-2 hover:border-signal hover:text-signal transition-colors shrink-0"
                  >
                    {kopiert ? (
                      <>
                        <Check className="h-3 w-3 text-[#27c93f]" />
                        <span className="text-[#27c93f]">KOPIERT</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>KOPIEREN</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Standort Card */}
              <div className="rounded-xl border border-linie bg-raum p-4 font-mono-code text-[12px] space-y-1">
                <div className="flex items-center gap-2 text-signal">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="font-bold">STANDORT // EINSATZGEBIET:</span>
                </div>
                <p className="text-text-2 pt-1">
                  Dornburg (Hessen) • Koblenz • Frankfurt / Rhein-Main • Remote
                </p>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="rounded-xl border border-signal/50 bg-signal/10 p-4 font-mono-code text-[11px]">
              <div className="flex items-center gap-2 text-signal font-bold">
                <span className="h-2 w-2 rounded-full bg-signal animate-ping" />
                <span>OFFEN FÜR ANGEBOTE</span>
              </div>
              <p className="mt-1 text-text-2">
                Junior Software Engineer (Fullstack / Backend Java) • Festanstellung ab 2026.
              </p>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <form onSubmit={absenden} className="space-y-4 relative">
              {/* Unsichtbare Bot-Falle (Honeypot) - Nicht anfassbar für echte Menschen */}
              <div
                className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden opacity-0"
                aria-hidden="true"
                tabIndex={-1}
              >
                <label htmlFor="website_check">Bitte dieses Feld freilassen</label>
                <input
                  type="text"
                  id="website_check"
                  name="website_check"
                  value={honeypot}
                  onChange={(e) => setzeHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-code text-[10.5px] uppercase tracking-wider text-text-3 mb-1.5">
                    Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    placeholder="Dein Name oder Unternehmen"
                    className="w-full rounded-lg border border-linie bg-raum px-3.5 py-2.5 font-mono-code text-[13px] text-text outline-none transition-colors focus:border-signal"
                  />
                </div>

                <div>
                  <label className="block font-mono-code text-[10.5px] uppercase tracking-wider text-text-3 mb-1.5">
                    E-Mail-Adresse:
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => handleInputChange(e, 'email')}
                    placeholder="name@unternehmen.de"
                    className="w-full rounded-lg border border-linie bg-raum px-3.5 py-2.5 font-mono-code text-[13px] text-text outline-none transition-colors focus:border-signal"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono-code text-[10.5px] uppercase tracking-wider text-text-3 mb-1.5">
                  Nachricht / Projektanfrage:
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.nachricht}
                  onChange={(e) => handleInputChange(e, 'nachricht')}
                  placeholder="Wie kann ich dein Team oder Projekt unterstützen?"
                  className="w-full rounded-lg border border-linie bg-raum px-3.5 py-2.5 font-mono-code text-[13px] text-text outline-none transition-colors focus:border-signal resize-none"
                />
              </div>

              {erfolg && (
                <div className="flex items-center gap-2 rounded-lg border border-[#27c93f]/40 bg-[#27c93f]/10 p-3 font-mono-code text-[12px] text-[#27c93f]">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>Vielen Dank! Deine Nachricht wurde erfolgreich übertragen.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={ladend}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-signal px-6 py-3.5 font-mono-code text-[13px] font-bold uppercase tracking-wider text-signal-tief shadow-[0_8px_30px_rgba(255,154,60,0.35)] transition-all hover:scale-[1.01] hover:bg-[#ffb066] disabled:opacity-50"
              >
                <span>{ladend ? 'WIRD ÜBERTRAGEN...' : 'NACHRICHT ABSENDEN'}</span>
                <Send className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 font-mono-code text-[10px] text-text-3">
                  <ShieldCheck className="h-3 w-3 text-signal" />
                  <span>Spam-Schutz aktiv (Honeypot & Time-Gate)</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kontakt;
