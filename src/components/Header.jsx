import { useEffect, useState } from 'react'
import { Clock, Globe, Menu, Phone, X } from 'lucide-react'
import { NAV, PHONE, PHONE_HREF, Logo, cn, useLang, useT } from '../lib.jsx'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { lang, toggle } = useLang()
  const t = useT()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy-deep text-navy-foreground">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-sm sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-ice">
            <Clock className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">
              {t('Available 24/7 · No fee unless we win', 'Disponibles 24/7 · Sin costo a menos que ganemos')}
            </span>
            <span className="sm:hidden">{t('Available 24/7', 'Disponibles 24/7')}</span>
          </p>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={lang === 'es'}
            className="flex items-center gap-2 rounded-full border border-ice/30 px-3 py-0.5 font-semibold transition-colors hover:bg-ice hover:text-navy"
          >
            <Globe className="size-3.5" aria-hidden />
            {lang === 'es' ? 'English' : 'Se Habla Español'}
          </button>
        </div>
      </div>
      <div
        className={cn(
          'border-b bg-background/90 backdrop-blur-md transition-shadow',
          scrolled ? 'border-border shadow-card' : 'border-transparent',
        )}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-md px-3 py-2 text-sm font-semibold text-navy/80 transition-colors hover:bg-ice-soft hover:text-navy"
              >
                {lang === 'es' ? n.es : n.en}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-md border border-border text-navy md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open && (
          <nav aria-label="Mobile" className="border-t border-border bg-background px-4 pb-5 pt-2 md:hidden">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block border-b border-border py-3 font-display text-lg text-navy last:border-b-0"
              >
                {lang === 'es' ? n.es : n.en}
              </a>
            ))}
            <div className="mt-4 grid gap-3">
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 rounded-md bg-gradient-burgundy py-3.5 text-base font-bold text-primary-foreground"
              >
                <Phone className="size-4" aria-hidden /> {PHONE}
              </a>
              <button
                type="button"
                onClick={toggle}
                className="flex items-center justify-center gap-2 rounded-md border border-border py-3.5 text-base font-semibold text-navy"
              >
                <Globe className="size-4" aria-hidden />
                {lang === 'es' ? 'English' : 'Español'}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
