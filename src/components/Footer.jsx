import { MapPin, Phone } from 'lucide-react'
import { EMAIL, NAV, OFFICES, PHONE, PHONE_HREF, Logo } from '../lib.jsx'

const PRACTICE = ['Car Accidents', "Workers' Compensation", 'Personal Injury', 'Wrongful Death', 'Motorcycle Crashes', 'Dog Bites']

export default function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-16 sm:px-6 md:pb-12 lg:px-8">
        <div className="grid gap-10 border-b border-ice/15 pb-12 md:grid-cols-3">
          {OFFICES.map((o) => (
            <div key={o.city} className="rounded-2xl border border-ice/15 p-6">
              <p className="eyebrow text-ice">{o.label}</p>
              <p className="mt-2 font-display text-2xl">{o.city}</p>
              <p className="mt-3 flex items-start gap-2 text-sm text-navy-foreground/75">
                <MapPin className="mt-0.5 size-4 shrink-0 text-ice" />
                <span>
                  {o.address}
                  <br />
                  {o.locality}
                </span>
              </p>
            </div>
          ))}
        </div>
        <div className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo inverted />
            <p className="mt-5 max-w-xs text-sm text-navy-foreground/70">
              Hardworking Attorneys for Hardworking People®. Serving injured Marylanders in all 24 jurisdictions since
              2002.
            </p>
          </div>
          <div>
            <p className="eyebrow text-ice">Practice areas</p>
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/75">
              {PRACTICE.map((p) => (
                <li key={p}>
                  <a href="#practice-areas" className="hover:text-ice">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-ice">Explore</p>
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/75">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-ice">
                    {n.en}
                  </a>
                </li>
              ))}
              <li>
                <a href="#estimate" className="hover:text-ice">
                  Case Estimate
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-ice">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/75">
              <li>
                <a href={PHONE_HREF} className="flex items-center gap-2 font-bold text-navy-foreground hover:text-ice">
                  <Phone className="size-4" /> {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:text-ice">
                  {EMAIL}
                </a>
              </li>
              <li>Available 24/7</li>
              <li>Se Habla Español</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-ice/15 pt-6 text-xs text-navy-foreground/55 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Pinder Plotkin Legal Team. All rights reserved.</p>
          <p className="max-w-xl md:text-right">
            Attorney advertising. The information on this website is not legal advice. Prior results do not guarantee a
            similar outcome.
          </p>
        </div>
      </div>
    </footer>
  )
}
