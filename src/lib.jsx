import { createContext, useContext, useState } from 'react'

export const cn = (...a) => a.filter(Boolean).join(' ')

export const PHONE = '888-844-5373'
export const PHONE_HREF = 'tel:+18888445373'
export const EMAIL = 'info@pinderplotkin.com'

export const NAV = [
  { href: '#practice-areas', en: 'Practice Areas', es: 'Áreas de Práctica' },
  { href: '#results', en: 'Results', es: 'Resultados' },
  { href: '#reviews', en: 'Reviews', es: 'Reseñas' },
  { href: '#process', en: 'How It Works', es: 'Cómo Funciona' },
  { href: '#faq', en: 'FAQ', es: 'Preguntas' },
]

export const OFFICES = [
  { city: 'Baltimore', label: 'Headquarters · Baltimore County', address: '4300 Ridge Rd.', locality: 'Baltimore, MD 21236' },
  { city: 'Laurel', label: "Prince George's County", address: '329 Prince George St.', locality: 'Laurel, MD 20707' },
  { city: 'Bel Air', label: 'Harford County', address: 'Serving Harford & Cecil', locality: 'Bel Air, MD' },
]

const LangContext = createContext({ lang: 'en', toggle: () => {} })

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en')
  const toggle = () => setLang((l) => (l === 'en' ? 'es' : 'en'))
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)

/** Returns t(en, es) that picks the string for the active language. */
export function useT() {
  const { lang } = useLang()
  return (en, es) => (lang === 'es' ? es : en)
}

export function Logo({ inverted = false, className }) {
  return (
    <a href="#top" className={cn('group flex items-center gap-3', className)} aria-label="Pinder Plotkin Legal Team home">
      <span
        className={cn(
          'grid size-10 place-items-center rounded-md font-display text-lg font-semibold italic',
          inverted ? 'bg-ice text-navy' : 'bg-navy text-navy-foreground',
        )}
      >
        PP
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[1.15rem] font-semibold tracking-tight',
            inverted ? 'text-navy-foreground' : 'text-navy',
          )}
        >
          Pinder Plotkin
        </span>
        <span className={cn('eyebrow mt-1 text-[0.6rem]', inverted ? 'text-ice' : 'text-burgundy')}>Legal Team</span>
      </span>
    </a>
  )
}

export function SectionHeading({ eyebrow, title, intro, align = 'left', inverted = false }) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <p className={cn('eyebrow', inverted ? 'text-ice' : 'text-burgundy')}>{eyebrow}</p>
      <h2
        className={cn(
          'mt-3 text-4xl font-medium leading-[1.08] sm:text-5xl',
          inverted ? 'text-navy-foreground' : 'text-navy',
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed',
            inverted ? 'text-navy-foreground/70' : 'text-muted-foreground',
          )}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
