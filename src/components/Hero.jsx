import { ArrowRight, BadgeDollarSign, Clock, Phone, ShieldCheck, Star } from 'lucide-react'
import { PHONE, PHONE_HREF, useT } from '../lib.jsx'
import teamImg from '../assets/pinder-plotkin-team.png'

export default function Hero() {
  const t = useT()
  const pills = [
    { icon: ShieldCheck, label: t('No upfront fees', 'Sin pagos por adelantado') },
    { icon: Clock, label: t('24/7 availability', 'Disponibles 24/7') },
    { icon: BadgeDollarSign, label: t('Millions recovered', 'Millones recuperados') },
  ]

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-navy text-navy-foreground">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-burgundy/30 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div>
            <p className="eyebrow inline-flex w-fit items-center gap-2 rounded-full border border-ice/25 bg-ice/10 px-3 py-1.5 text-ice">
              <span className="size-1.5 rounded-full bg-ice" />
              {t(
                "Maryland Injury & Workers' Comp · Since 2002",
                'Lesiones y Compensación Laboral en Maryland · Desde 2002',
              )}
            </p>
            <h1 className="mt-6 text-4xl font-medium leading-[1.05] sm:text-5xl lg:text-[2.75rem] xl:text-[3.5rem]">
              <span className="block">{t('Hardworking Attorneys for', 'Abogados Trabajadores para')}</span>
              <span className="block">
                <em className="font-normal text-ice">{t('Hardworking People', 'Gente Trabajadora')}</em>
                <span className="ml-1 align-top text-[0.4em] leading-none text-ice/70">®</span>
              </span>
            </h1>
          </div>
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-navy-foreground/75">
              {t(
                'Hurt in a crash or on the job? We take on the insurance companies so you can focus on healing, and you pay nothing unless we win.',
                '¿Lesionado en un accidente o en el trabajo? Enfrentamos a las aseguradoras para que usted se concentre en sanar, y no paga nada a menos que ganemos.',
              )}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {pills.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ice/15 bg-navy-foreground/5 px-3 py-1 text-xs font-semibold"
                >
                  <Icon className="size-3.5 shrink-0 text-ice" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-gradient-burgundy px-6 py-4 text-base font-bold text-primary-foreground shadow-cta transition-transform hover:-translate-y-0.5"
              >
                {t('Get My Free Consultation', 'Obtener Consulta Gratis')}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-ice/30 px-6 py-4 text-base font-bold transition-colors hover:bg-ice hover:text-navy"
              >
                <Phone className="size-4" />
                {PHONE}
              </a>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-10 max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl border border-ice/20 shadow-elevated">
            <img
              src={teamImg}
              alt="The Pinder Plotkin Legal Team attorneys"
              width={1150}
              height={537}
              className="aspect-[1150/537] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent p-5 pt-16 sm:block sm:p-6 sm:pt-20">
              <p className="font-display text-lg sm:text-xl">
                {t('The Pinder Plotkin Legal Team', 'El Equipo Legal Pinder Plotkin')}
              </p>
              <p className="text-xs text-ice sm:text-sm">
                {t('Serving injured Marylanders since 2002', 'Al servicio de los lesionados de Maryland desde 2002')}
              </p>
            </div>
          </div>
          <div className="absolute -top-6 left-4 hidden rounded-xl bg-background p-4 text-navy shadow-elevated sm:block">
            <div className="flex gap-0.5 text-gold" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="mt-1 font-display text-2xl font-semibold">4.9 / 5</p>
            <p className="text-xs font-semibold text-muted-foreground">
              900+ {t('verified reviews', 'reseñas verificadas')}
            </p>
          </div>
          <div className="absolute -bottom-6 right-4 hidden rounded-xl bg-burgundy p-4 text-primary-foreground shadow-elevated sm:block">
            <p className="eyebrow text-[0.6rem] text-primary-foreground/70">
              {t('Recovered for clients', 'Recuperado para clientes')}
            </p>
            <p className="font-display text-2xl font-semibold">{t('Millions', 'Millones')}</p>
            <p className="text-xs text-primary-foreground/80">{t('every single year', 'cada año')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
