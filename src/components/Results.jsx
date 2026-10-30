import { SectionHeading, cn } from '../lib.jsx'

const RESULTS = [
  { amount: '$2.1M', type: 'Trucking collision', detail: 'Commercial truck ran a red light on I-695, causing spinal injuries.', feature: true },
  { amount: '$975K', type: 'Wrongful death', detail: 'Settlement for a family after a negligent driver crash in Harford County.' },
  { amount: '$640K', type: 'Motorcycle crash', detail: 'Rider struck by a left-turning SUV; insurer initially denied fault.' },
  { amount: '$425K', type: "Workers' compensation", detail: "Warehouse worker's shoulder and back injuries, plus lifetime medical." },
  { amount: '$310K', type: 'Car accident', detail: 'Rear-end collision with herniated discs. Offer was $25K before we stepped in.' },
  { amount: '$185K', type: 'Dog bite', detail: "Facial scarring to a child; homeowner's policy limits recovered." },
]

export default function Results() {
  return (
    <section id="results" className="relative overflow-hidden bg-gradient-navy py-24 text-navy-foreground">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          inverted
          eyebrow="Case results"
          title={
            <>
              Results that speak <em className="text-ice">louder</em> than ads
            </>
          }
          intro="Millions recovered for injured Marylanders every year. Here are a few recent outcomes."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESULTS.map((r) => (
            <article
              key={r.type}
              className={cn(
                'group flex min-h-48 flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1',
                r.feature
                  ? 'border-transparent bg-gradient-burgundy'
                  : 'border-ice/15 bg-navy-foreground/5 hover:border-ice/40 hover:bg-navy-foreground/10',
              )}
            >
              <p className={cn('eyebrow', r.feature ? 'text-primary-foreground/70' : 'text-ice')}>{r.type}</p>
              <div className="mt-6">
                <p className="font-display text-4xl font-medium leading-none tracking-tight sm:text-5xl">{r.amount}</p>
                <p
                  className={cn(
                    'mt-3 text-sm leading-relaxed',
                    r.feature ? 'text-primary-foreground/85' : 'text-navy-foreground/70',
                  )}
                >
                  {r.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-xs text-navy-foreground/50">
          Past results do not guarantee or predict a similar outcome in any future case.
        </p>
      </div>
    </section>
  )
}
