import { useState } from 'react'
import { ArrowLeft, ArrowRight, Bike, Briefcase, Car, Check, Dog, Footprints, Lock, Truck } from 'lucide-react'
import { SectionHeading, cn } from '../lib.jsx'

const ACCIDENTS = [
  { id: 'car', label: 'Car Accident', multiplier: 1, icon: Car },
  { id: 'truck', label: 'Truck Accident', multiplier: 1.6, icon: Truck },
  { id: 'motorcycle', label: 'Motorcycle Crash', multiplier: 1.45, icon: Bike },
  { id: 'work', label: 'Work Injury', multiplier: 0.9, icon: Briefcase },
  { id: 'slip', label: 'Slip & Fall', multiplier: 0.8, icon: Footprints },
  { id: 'dog', label: 'Dog Bite', multiplier: 0.7, icon: Dog },
]

const CARE = [
  { id: 'none', label: 'No treatment yet', detail: "I haven't seen a doctor", low: 2500, high: 10000 },
  { id: 'er', label: 'ER or urgent care', detail: 'Single visit, released same day', low: 7500, high: 30000 },
  { id: 'ongoing', label: 'Ongoing treatment', detail: 'Physical therapy, chiropractor, specialists', low: 20000, high: 85000 },
  { id: 'hospital', label: 'Hospital stay', detail: 'Admitted overnight or longer', low: 60000, high: 275000 },
  { id: 'surgery', label: 'Surgery required', detail: 'Surgical repair or permanent injury', low: 125000, high: 750000 },
]

const STEPS = ['Accident type', 'Medical care', 'Your estimate']

function estimate(accidentId, careId) {
  const a = ACCIDENTS.find((x) => x.id === accidentId)
  const c = CARE.find((x) => x.id === careId)
  if (!a || !c) throw Error('Unknown accident type or care level')
  const round = (n) => Math.round(n / 500) * 500
  return { low: round(c.low * a.multiplier), high: round(c.high * a.multiplier) }
}

const usd = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function Estimate() {
  const [step, setStep] = useState(0)
  const [accident, setAccident] = useState(null)
  const [care, setCare] = useState(null)
  const result = accident && care ? estimate(accident, care) : null

  return (
    <section id="estimate" className="relative bg-background py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <SectionHeading
            eyebrow="Free case estimate"
            title={
              <>
                What could your case be <em className="text-burgundy">worth?</em>
              </>
            }
            intro="Answer two quick questions for an instant, preliminary range. It's 100% confidential and takes about 20 seconds."
          />
          <ul className="mt-8 space-y-3 text-sm font-semibold text-navy">
            {['No personal info required', 'Based on Maryland case factors', 'Reviewed free by an attorney'].map((x) => (
              <li key={x} className="flex items-center gap-3">
                <span className="grid size-6 place-items-center rounded-full bg-ice text-navy">
                  <Check className="size-3.5" />
                </span>
                {x}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-elevated sm:p-10">
          <ol className="mb-8 grid grid-cols-3 gap-2" aria-label="Estimate progress">
            {STEPS.map((label, i) => (
              <li key={label}>
                <div className={cn('h-1.5 rounded-full transition-colors', i <= step ? 'bg-burgundy' : 'bg-muted')} />
                <p
                  className={cn(
                    'mt-2 text-xs font-bold uppercase tracking-wider',
                    i <= step ? 'text-navy' : 'text-muted-foreground',
                  )}
                >
                  <span className="hidden sm:inline">Step {i + 1} · </span>
                  {label}
                </p>
              </li>
            ))}
          </ol>

          {step === 0 && (
            <div>
              <h3 className="text-2xl font-medium text-navy">What kind of accident were you in?</h3>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {ACCIDENTS.map((a) => {
                  const Icon = a.icon
                  const selected = accident === a.id
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => {
                        setAccident(a.id)
                        setStep(1)
                      }}
                      aria-pressed={selected}
                      className={cn(
                        'group flex flex-col items-start gap-4 rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:border-navy hover:shadow-card',
                        selected ? 'border-burgundy bg-burgundy/5' : 'border-border bg-background',
                      )}
                    >
                      <span
                        className={cn(
                          'grid size-11 place-items-center rounded-xl transition-colors',
                          selected
                            ? 'bg-burgundy text-primary-foreground'
                            : 'bg-ice-soft text-navy group-hover:bg-navy group-hover:text-ice',
                        )}
                      >
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="font-bold text-navy">{a.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="text-2xl font-medium text-navy">What medical care have you received?</h3>
              <div className="mt-6 space-y-3">
                {CARE.map((c) => {
                  const selected = care === c.id
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setCare(c.id)
                        setStep(2)
                      }}
                      aria-pressed={selected}
                      className={cn(
                        'flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-all hover:border-navy hover:shadow-card',
                        selected ? 'border-burgundy bg-burgundy/5' : 'border-border',
                      )}
                    >
                      <span>
                        <span className="block font-bold text-navy">{c.label}</span>
                        <span className="block text-sm text-muted-foreground">{c.detail}</span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-burgundy" />
                    </button>
                  )
                })}
              </div>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-navy"
              >
                <ArrowLeft className="size-4" /> Back
              </button>
            </div>
          )}

          {step === 2 && result && (
            <div>
              <p className="eyebrow text-burgundy">Preliminary estimate</p>
              <div className="mt-4 rounded-2xl bg-gradient-navy p-8 text-navy-foreground">
                <p className="text-sm text-ice">
                  {ACCIDENTS.find((a) => a.id === accident)?.label} · {CARE.find((c) => c.id === care)?.label}
                </p>
                <p className="mt-3 font-display text-4xl font-medium sm:text-5xl" aria-live="polite">
                  {usd(result.low)} <span className="text-ice/60">–</span> {usd(result.high)}
                </p>
                <p className="mt-4 text-sm text-navy-foreground/70">
                  Cases with lost wages, permanent injury, or commercial insurance often recover more. An attorney can
                  give you a precise number — for free.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-gradient-burgundy px-6 py-4 font-bold text-primary-foreground shadow-cta transition-transform hover:-translate-y-0.5"
                >
                  Get my exact case value <ArrowRight className="size-4" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setStep(0)
                    setAccident(null)
                    setCare(null)
                  }}
                  className="rounded-md border border-border px-6 py-4 font-bold text-navy hover:bg-muted"
                >
                  Start over
                </button>
              </div>
            </div>
          )}

          <p className="mt-8 flex items-start gap-2 border-t border-border pt-5 text-xs text-muted-foreground">
            <Lock className="mt-0.5 size-3.5 shrink-0" />
            This tool provides a general, non-binding range for informational purposes only and is not legal advice.
            Every case is different; past results do not guarantee future outcomes.
          </p>
        </div>
      </div>
    </section>
  )
}
