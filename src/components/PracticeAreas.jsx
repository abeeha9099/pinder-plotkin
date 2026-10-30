import { ArrowUpRight, Bike, Briefcase, Car, HeartCrack, ShieldPlus } from 'lucide-react'
import { SectionHeading } from '../lib.jsx'

const AREAS = [
  {
    icon: Car,
    title: 'Car Accidents',
    body: 'Rear-end, T-bone, rideshare and uninsured-driver crashes across all 24 Maryland jurisdictions.',
    benefits: ['PIP & MedPay recovered', 'Property damage handled', 'Rental car help'],
  },
  {
    icon: Briefcase,
    title: "Workers' Compensation",
    body: 'Hurt on the job? We fight for wage benefits, medical care and permanency awards — including first responders.',
    benefits: ['Lost wages recovered', 'Treatment approved', 'Firefighters, EMTs & police'],
  },
  {
    icon: ShieldPlus,
    title: 'Personal Injury',
    body: 'Slip and falls, dog bites, unsafe property and negligence claims built to beat contributory negligence.',
    benefits: ['Premises liability', 'Dog bites & scarring', 'Medical liens negotiated'],
  },
  {
    icon: HeartCrack,
    title: 'Wrongful Death',
    body: "Compassionate, relentless advocacy for families who lost a loved one because of someone else's negligence.",
    benefits: ['Survival actions', 'Funeral costs', 'Loss of support'],
  },
  {
    icon: Bike,
    title: 'Motorcycle Crashes',
    body: 'Riders face bias from insurers. We reconstruct the crash and push back against blame-the-biker tactics.',
    benefits: ['Crash reconstruction', 'Catastrophic injuries', 'Gear & bike damage'],
  },
]

export default function PracticeAreas() {
  return (
    <section id="practice-areas" className="bg-ice-soft py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Practice areas"
            title={
              <>
                Focused on the cases that <em className="text-burgundy">change lives</em>
              </>
            }
          />
          <p className="max-w-sm text-muted-foreground">
            More than 20 years of personal injury, accident and workers' compensation experience in Maryland.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {AREAS.map(({ icon: Icon, title, body, benefits }, i) => (
            <a
              key={title}
              href="#contact"
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-navy hover:bg-navy hover:shadow-elevated ${i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}`}
            >
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-ice text-navy transition-colors group-hover:bg-burgundy group-hover:text-primary-foreground">
                  <Icon className="size-6" aria-hidden />
                </span>
                <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:rotate-45 group-hover:text-ice" />
              </div>
              <h3 className="mt-6 text-2xl font-medium text-navy transition-colors group-hover:text-navy-foreground">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-navy-foreground/75">
                {body}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {benefits.map((b) => (
                  <li
                    key={b}
                    className="rounded-full bg-ice-soft px-3 py-1 text-xs font-semibold text-navy transition-colors group-hover:bg-navy-foreground/10 group-hover:text-ice"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
