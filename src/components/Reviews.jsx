import { BadgeCheck, Quote, Star } from 'lucide-react'
import { SectionHeading } from '../lib.jsx'

const REVIEWS = [
  {
    name: 'Lee Harper',
    case: 'Car accident',
    quote:
      'My experience was fantastic. Charlotte was a big help and had the lawyer return my call within minutes. Jason was extremely knowledgeable and very helpful. I will have them represent me and my family.',
  },
  {
    name: 'Marisol G.',
    case: "Workers' compensation",
    quote:
      "After I got hurt at work I didn't know where to turn. They handled everything with my employer's insurance and I never missed a check. Me atendieron en español desde el primer día.",
  },
  {
    name: 'Derrick W.',
    case: 'Motorcycle crash',
    quote:
      'The insurance company tried to blame me for the crash. This team pulled the footage, found the witness and got me a settlement five times their first offer.',
  },
  {
    name: 'Tanya R.',
    case: 'Car accident',
    quote:
      'Professional, caring, and they kept me informed through the whole process. I always knew where my case stood and who to call.',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-current" aria-hidden />
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionHeading
              eyebrow="Client reviews"
              title={
                <>
                  Trusted by <em className="text-burgundy">900+</em> Maryland families
                </>
              }
            />
            <div className="mt-8 rounded-2xl border border-border bg-ice-soft p-6">
              <p className="font-display text-6xl font-medium text-navy">4.9</p>
              <Stars />
              <p className="mt-2 text-sm text-muted-foreground">Average across 900+ verified Google reviews</p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {REVIEWS.map((r, i) => (
              <figure
                key={r.name}
                className={`relative flex flex-col rounded-2xl border border-border bg-card p-7 shadow-card transition-transform hover:-translate-y-1 ${i % 2 === 1 ? 'sm:translate-y-8 sm:hover:translate-y-7' : ''}`}
              >
                <Quote className="absolute right-6 top-6 size-8 text-ice" aria-hidden />
                <Stars />
                <blockquote className="mt-4 flex-1 leading-relaxed text-navy">"{r.quote}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="grid size-10 place-items-center rounded-full bg-navy font-display text-ice">
                    {r.name[0]}
                  </span>
                  <span>
                    <span className="block font-bold text-navy">{r.name}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <BadgeCheck className="size-3.5 text-burgundy" /> Verified client · {r.case}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
