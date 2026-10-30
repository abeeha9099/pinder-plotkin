import { useState } from 'react'
import { CircleCheck, Lock, Mail, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { EMAIL, PHONE, PHONE_HREF, cn } from '../lib.jsx'
import skyline from '../assets/baltimore-skyline.jpg'

const CASE_TYPES = ['Car Accident', "Workers' Compensation", 'Personal Injury', 'Wrongful Death', 'Motorcycle Crash', 'Other']

const inputClass =
  'w-full rounded-lg border border-input bg-background px-4 py-3 text-navy placeholder:text-muted-foreground/70 outline-none transition focus:border-burgundy focus:ring-2 focus:ring-burgundy/20'

function validate(v) {
  const errors = {}
  const name = (v.name ?? '').trim()
  const phone = (v.phone ?? '').trim()
  const email = (v.email ?? '').trim()
  const message = (v.message ?? '').trim()
  if (!name) errors.name = 'Please enter your name'
  if (!/^[0-9()+\-.\s]{10,20}$/.test(phone)) errors.phone = 'Please enter a valid phone number'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) errors.email = 'Please enter a valid email'
  if (!v.caseType) errors.caseType = 'Please choose a case type'
  if (message.length > 1000) errors.message = 'Please keep it under 1,000 characters'
  return errors
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-navy">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-semibold text-destructive">{error}</span>}
    </label>
  )
}

export default function Contact() {
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const values = Object.fromEntries(new FormData(e.currentTarget))
    const found = validate(values)
    if (Object.keys(found).length) {
      setErrors(found)
      return
    }
    setErrors({})
    setSent(true)
    toast.success('Request received', { description: 'A member of our team will contact you shortly.' })
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-navy-deep py-24 text-navy-foreground">
      <img
        src={skyline}
        alt=""
        width={1600}
        height={912}
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy-deep/60" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col justify-center">
          <p className="eyebrow text-ice">Free consultation</p>
          <h2 className="mt-3 text-4xl font-medium leading-[1.08] sm:text-5xl">
            Tell us what happened. <em className="text-ice">We'll take it from there.</em>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-navy-foreground/75">
            A free case review with no obligation, and no fee unless we win. Someone on our team reads every message
            that comes in.
          </p>
          <div className="mt-8 space-y-4">
            <a href={PHONE_HREF} className="flex items-center gap-4 text-xl font-bold hover:text-ice">
              <span className="grid size-12 place-items-center rounded-full bg-burgundy">
                <Phone className="size-5" />
              </span>
              {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 font-semibold hover:text-ice">
              <span className="grid size-12 place-items-center rounded-full border border-ice/30">
                <Mail className="size-5" />
              </span>
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-card p-6 text-card-foreground shadow-elevated sm:p-10">
          {sent ? (
            <div className="flex min-h-96 flex-col items-center justify-center text-center">
              <CircleCheck className="size-14 text-burgundy" />
              <h3 className="mt-4 text-3xl font-medium text-navy">Thank you — we're on it.</h3>
              <p className="mt-3 max-w-sm text-muted-foreground">
                An attorney or case manager will reach out shortly. Need help right now? Call {PHONE}.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-6 text-sm font-bold text-burgundy hover:underline"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <h3 className="text-2xl font-medium text-navy">Get your free case review</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" error={errors.name}>
                  <input name="name" autoComplete="name" maxLength={100} className={inputClass} placeholder="Jane Doe" />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={20}
                    className={inputClass}
                    placeholder="(410) 555-0123"
                  />
                </Field>
              </div>
              <Field label="Email" error={errors.email}>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={255}
                  className={inputClass}
                  placeholder="you@email.com"
                />
              </Field>
              <Field label="Type of case" error={errors.caseType}>
                <select name="caseType" defaultValue="" className={cn(inputClass, 'appearance-none')}>
                  <option value="" disabled>
                    Select one…
                  </option>
                  {CASE_TYPES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="What happened? (optional)" error={errors.message}>
                <textarea
                  name="message"
                  rows={4}
                  maxLength={1000}
                  className={inputClass}
                  placeholder="Briefly describe your accident or injury"
                />
              </Field>
              <button
                type="submit"
                className="w-full rounded-md bg-gradient-burgundy py-4 text-base font-bold text-primary-foreground shadow-cta transition-transform hover:-translate-y-0.5"
              >
                Request My Free Consultation
              </button>
              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="size-3.5" /> Confidential · No obligation · No fee unless we win
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
