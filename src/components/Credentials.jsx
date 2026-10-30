import { Award, Gavel, Scale, Star, Trophy, Users } from 'lucide-react'

const ITEMS = [
  { icon: Award, title: 'Super Lawyers', sub: 'Maryland · 2020–2026' },
  { icon: Scale, title: 'Maryland Bar', sub: 'Licensed & in good standing' },
  { icon: Trophy, title: 'Top 100 Trial Lawyers', sub: 'The National Trial Lawyers' },
  { icon: Star, title: '4.9★ Rating', sub: '900+ verified reviews' },
  { icon: Gavel, title: 'Million Dollar Advocates', sub: 'Life member' },
  { icon: Users, title: 'Since 2002', sub: 'All 24 MD jurisdictions' },
]

export default function Credentials() {
  const loop = [...ITEMS, ...ITEMS]
  return (
    <section aria-label="Credentials" className="border-b border-border bg-ice-soft">
      <div className="relative overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {loop.map(({ icon: Icon, title, sub }, i) => (
            <li
              key={i}
              aria-hidden={i >= ITEMS.length}
              className="flex min-w-64 items-center gap-3 rounded-xl border border-border bg-background px-5 py-3"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy text-ice">
                <Icon className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block font-display text-base font-semibold text-navy">{title}</span>
                <span className="block text-sm text-muted-foreground">{sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
