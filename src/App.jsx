import { MessageSquareText, Phone } from 'lucide-react'
import { Toaster } from 'sonner'
import { LangProvider, PHONE_HREF, useT } from './lib.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Credentials from './components/Credentials.jsx'
import Estimate from './components/Estimate.jsx'
import PracticeAreas from './components/PracticeAreas.jsx'
import Results from './components/Results.jsx'
import Reviews from './components/Reviews.jsx'
import Process from './components/Process.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function MobileCtaBar() {
  const t = useT()
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a
          href={PHONE_HREF}
          className="flex items-center justify-center gap-2 rounded-md bg-navy py-3.5 text-sm font-bold text-navy-foreground"
        >
          <Phone className="size-4" /> {t('Call Now', 'Llamar')}
        </a>
        <a
          href="#contact"
          className="flex items-center justify-center gap-2 rounded-md bg-gradient-burgundy py-3.5 text-sm font-bold text-primary-foreground shadow-cta"
        >
          <MessageSquareText className="size-4" /> {t('Free Consultation', 'Consulta Gratis')}
        </a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Header />
      <main>
        <Hero />
        <Credentials />
        <Estimate />
        <PracticeAreas />
        <Results />
        <Reviews />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileCtaBar />
      <Toaster />
    </LangProvider>
  )
}
