import { useRef, useState } from 'react'
import { CircleCheck, Lock, Mail, Phone, TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'
import { EMAIL, PHONE, PHONE_HREF, cn, sendLead, useT } from '../lib.jsx'
import skyline from '../assets/baltimore-skyline.jpg'

// value is what gets sent to the firm (always English); en/es is the label shown.
const CASE_TYPES = [
  { value: 'Car Accident', en: 'Car Accident', es: 'Accidente de Auto' },
  { value: "Workers' Compensation", en: "Workers' Compensation", es: 'Compensación Laboral' },
  { value: 'Personal Injury', en: 'Personal Injury', es: 'Lesiones Personales' },
  { value: 'Wrongful Death', en: 'Wrongful Death', es: 'Muerte por Negligencia' },
  { value: 'Motorcycle Crash', en: 'Motorcycle Crash', es: 'Accidente de Motocicleta' },
  { value: 'Other', en: 'Other', es: 'Otro' },
]

const inputClass =
  'w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-navy placeholder:text-muted-foreground/70 outline-none transition focus:border-burgundy focus:ring-2 focus:ring-burgundy/20'

const FIELD_ORDER = ['name', 'phone', 'email', 'caseType', 'message']

function validateField(name, value, t) {
  const v = (value ?? '').trim()
  switch (name) {
    case 'name':
      return v ? '' : t('Please enter your name', 'Por favor escriba su nombre')
    case 'phone': {
      const digits = v.replace(/\D/g, '')
      const ok = /^[0-9()+\-.\s]+$/.test(v) && (digits.length === 10 || (digits.length === 11 && digits[0] === '1'))
      return ok ? '' : t('Enter a 10-digit phone number, like (410) 555-0123', 'Escriba un teléfono de 10 dígitos, como (410) 555-0123')
    }
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 255
        ? ''
        : t('Enter an email like you@email.com', 'Escriba un correo como usted@correo.com')
    case 'caseType':
      return v ? '' : t('Please choose a case type', 'Por favor elija un tipo de caso')
    case 'message':
      return v.length > 1000 ? t('Please keep it under 1,000 characters', 'Por favor use menos de 1,000 caracteres') : ''
    default:
      return ''
  }
}

function Field({ name, label, error, children }) {
  return (
    <div>
      <label htmlFor={`contact-${name}`} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
      </label>
      {children}
      {error && (
        <p id={`contact-${name}-error`} className="mt-1.5 text-sm font-semibold text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const t = useT()
  const formRef = useRef(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed

  const setFieldError = (name, message) =>
    setErrors((prev) => {
      if (!message) {
        if (!(name in prev)) return prev
        const { [name]: _removed, ...rest } = prev
        return rest
      }
      return { ...prev, [name]: message }
    })

  // Shared props wiring each control to its label, error text and live validation.
  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
    onBlur: (e) => setFieldError(name, validateField(name, e.target.value, t)),
    // Clear a shown error as soon as the visitor starts fixing it.
    onChange: (e) => errors[name] && setFieldError(name, validateField(name, e.target.value, t)),
    className: cn(inputClass, errors[name] && 'border-destructive'),
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    const values = Object.fromEntries(new FormData(e.currentTarget))
    const found = {}
    for (const name of FIELD_ORDER) {
      const msg = validateField(name, values[name], t)
      if (msg) found[name] = msg
    }
    setErrors(found)
    const first = FIELD_ORDER.find((n) => found[n])
    if (first) {
      formRef.current?.elements[first]?.focus()
      return
    }
    setStatus('sending')
    try {
      await sendLead(values)
      setStatus('sent')
      toast.success(t('Request received', 'Solicitud recibida'), {
        description: t('A member of our team will contact you shortly.', 'Un miembro de nuestro equipo le contactará pronto.'),
      })
    } catch {
      setStatus('failed')
    }
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
          <p className="eyebrow text-ice">{t('Free consultation', 'Consulta gratis')}</p>
          <h2 className="mt-3 text-4xl font-medium leading-[1.08] sm:text-5xl">
            {t('Tell us what happened.', 'Cuéntenos qué pasó.')}{' '}
            <em className="text-ice">{t("We'll take it from there.", 'Nosotros nos encargamos.')}</em>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-navy-foreground/75">
            {t(
              'A free case review with no obligation, and no fee unless we win. Someone on our team reads every message that comes in.',
              'Una revisión gratuita de su caso, sin compromiso y sin costo a menos que ganemos. Alguien de nuestro equipo lee cada mensaje.',
            )}
          </p>
          <div className="mt-8 space-y-4">
            <a href={PHONE_HREF} className="flex items-center gap-4 text-xl font-bold hover:text-ice">
              <span className="grid size-12 place-items-center rounded-full bg-burgundy">
                <Phone className="size-5" aria-hidden />
              </span>
              {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 font-semibold hover:text-ice">
              <span className="grid size-12 place-items-center rounded-full border border-ice/30">
                <Mail className="size-5" aria-hidden />
              </span>
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-card p-6 text-card-foreground shadow-elevated sm:p-10">
          {status === 'sent' ? (
            <div className="flex min-h-96 flex-col items-center justify-center text-center" role="status">
              <CircleCheck className="size-14 text-burgundy" aria-hidden />
              <h3 className="mt-4 text-3xl font-medium text-navy">{t("Thank you — we're on it.", 'Gracias, ya estamos en ello.')}</h3>
              <p className="mt-3 max-w-sm text-muted-foreground">
                {t(
                  `An attorney or case manager will reach out shortly. Need help right now? Call ${PHONE}.`,
                  `Un abogado o gerente de casos se comunicará pronto. ¿Necesita ayuda ahora? Llame al ${PHONE}.`,
                )}
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm font-bold text-burgundy hover:underline"
              >
                {t('Send another request', 'Enviar otra solicitud')}
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-4">
              <h3 className="text-2xl font-medium text-navy">{t('Get your free case review', 'Obtenga su revisión de caso gratis')}</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="name" label={t('Full name', 'Nombre completo')} error={errors.name}>
                  <input {...fieldProps('name')} autoComplete="name" maxLength={100} placeholder="Jane Doe" />
                </Field>
                <Field name="phone" label={t('Phone', 'Teléfono')} error={errors.phone}>
                  <input
                    {...fieldProps('phone')}
                    type="tel"
                    autoComplete="tel"
                    maxLength={20}
                    placeholder="(410) 555-0123"
                  />
                </Field>
              </div>
              <Field name="email" label={t('Email', 'Correo electrónico')} error={errors.email}>
                <input
                  {...fieldProps('email')}
                  type="email"
                  autoComplete="email"
                  maxLength={255}
                  placeholder="you@email.com"
                />
              </Field>
              <Field name="caseType" label={t('Type of case', 'Tipo de caso')} error={errors.caseType}>
                <select {...fieldProps('caseType')} defaultValue="">
                  <option value="" disabled>
                    {t('Select one…', 'Seleccione uno…')}
                  </option>
                  {CASE_TYPES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {t(c.en, c.es)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                name="message"
                label={t('What happened? (optional)', '¿Qué pasó? (opcional)')}
                error={errors.message}
              >
                <textarea
                  {...fieldProps('message')}
                  rows={4}
                  maxLength={1000}
                  placeholder={t('Briefly describe your accident or injury', 'Describa brevemente su accidente o lesión')}
                />
              </Field>
              {status === 'failed' && (
                <p
                  role="alert"
                  className="flex items-start gap-2 rounded-lg border border-destructive bg-background p-3 text-sm font-semibold text-destructive"
                >
                  <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>
                    {t(
                      `We couldn't send your request. Please try again or call ${PHONE}.`,
                      `No pudimos enviar su solicitud. Intente de nuevo o llame al ${PHONE}.`,
                    )}
                  </span>
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-md bg-gradient-burgundy py-4 text-base font-bold text-primary-foreground shadow-cta transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
              >
                {status === 'sending'
                  ? t('Sending…', 'Enviando…')
                  : t('Request My Free Consultation', 'Solicitar Mi Consulta Gratis')}
              </button>
              <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Lock className="size-3.5" aria-hidden />
                {t('Confidential · No obligation · No fee unless we win', 'Confidencial · Sin compromiso · Sin costo a menos que ganemos')}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
