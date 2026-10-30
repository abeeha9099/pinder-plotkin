import { Handshake, MessagesSquare, SearchCheck } from 'lucide-react'
import { SectionHeading } from '../lib.jsx'

const STEPS = [
  {
    icon: MessagesSquare,
    title: 'Free consultation',
    body: 'Call, text or fill out the form — day or night. We listen, answer your questions and explain your options. No cost, no obligation.',
  },
  {
    icon: SearchCheck,
    title: 'Investigation & negotiation',
    body: 'We gather evidence, medical records and witness statements, then handle every call with the insurance company so you can heal.',
  },
  {
    icon: Handshake,
    title: 'Maximum recovery',
    body: "We push for every dollar — medical bills, lost wages, pain and suffering — and go to trial when insurers won't be fair.",
  },
]

export default function Process() {
  return (
    <section id="process" className="bg-ice-soft py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title={
            <>
              Three steps from injury to <em className="text-burgundy">justice</em>
            </>
          }
          intro="You pay nothing upfront. We only get paid if we recover compensation for you."
        />
        <ol className="relative mt-16 grid gap-6 md:grid-cols-3">
          <div
            className="absolute left-[16%] right-[16%] top-10 hidden h-px border-t-2 border-dashed border-navy/20 md:block"
            aria-hidden
          />
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="relative flex flex-col items-center text-center">
              <span className="relative grid size-20 place-items-center rounded-full border-4 border-ice-soft bg-navy text-ice shadow-card">
                <Icon className="size-8" aria-hidden />
                <span className="absolute -right-1 -top-1 grid size-7 place-items-center rounded-full bg-burgundy text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-6 text-2xl font-medium text-navy">{title}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
