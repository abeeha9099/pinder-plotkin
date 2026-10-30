import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PHONE, PHONE_HREF, SectionHeading, cn } from '../lib.jsx'

const FAQS = [
  {
    q: 'How much does it cost to hire Pinder Plotkin?',
    a: "Nothing upfront. We work on a contingency fee basis, which means we only get paid if we recover compensation for you. If we don't win, you owe us no attorney's fees.",
  },
  {
    q: 'How long do I have to file a claim in Maryland?',
    a: "In most Maryland personal injury cases, the statute of limitations is three years from the date of the injury. Workers' compensation claims generally must be filed within 60 days of the injury, so it's important to act quickly.",
  },
  {
    q: 'What is contributory negligence, and how does it affect my case?',
    a: "Maryland is one of the few states that follows contributory negligence — if you're found even 1% at fault, you may be barred from recovering. Insurers use this rule aggressively, which is why strong evidence and experienced counsel matter.",
  },
  {
    q: "Can I be fired for filing a workers' comp claim?",
    a: "No. Maryland law prohibits employers from firing an employee solely for filing a workers' compensation claim. If you believe you've been retaliated against, tell us right away.",
  },
  {
    q: "Should I talk to the other driver's insurance company?",
    a: "It's best to speak with an attorney first. Adjusters may record your statement and use it to reduce or deny your claim. We'll handle those conversations for you.",
  },
  {
    q: "What if I wasn't wearing a seatbelt or helmet?",
    a: "In Maryland, failing to wear a seatbelt generally can't be used to reduce your recovery in a car accident case. Motorcycle helmet questions are more nuanced — call us and we'll explain how it applies to you.",
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-background py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Answers to <em className="text-burgundy">common</em> questions
              </>
            }
            intro="Accidents and work injuries raise a lot of questions. Here are the ones we hear most."
          />
          <a href={PHONE_HREF} className="mt-6 inline-block font-bold text-burgundy underline-offset-4 hover:underline">
            Still unsure? Call {PHONE}
          </a>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {FAQS.map((f, i) => {
            const open = openIndex === i
            return (
              <div key={f.q}>
                <h3 className="flex">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className={cn(
                      'flex flex-1 cursor-pointer items-center justify-between py-6 text-left font-display text-xl font-medium transition-all',
                      open ? 'text-burgundy' : 'text-navy',
                    )}
                  >
                    {f.q}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
                        open && 'rotate-180',
                      )}
                    />
                  </button>
                </h3>
                {open && <div className="pb-6 text-base leading-relaxed text-muted-foreground">{f.a}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
