import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Sprout, Target, Users } from 'lucide-react'
import { StrokeScene } from '@/studio/StrokeScene'
import { useStudio } from '@/studio/store'
import { useContent } from '@/i18n/content'
import { useT } from '@/i18n'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Footer } from '@/components/Footer'

const ENTRIES = [
  { id: 'never', to: '/path', Icon: Sprout },
  { id: 'improve', to: '/studio/forehand', Icon: Target },
  { id: 'coach', to: '/move', Icon: Users },
  { id: 'rules', to: '/learn/rules', Icon: BookOpen },
] as const

const HOWTO = ['slow', 'dial', 'pro'] as const

export function HomePage() {
  const t = useT()
  const { strokes } = useContent()
  const forehand = strokes.find((s) => s.id === 'forehand')!
  const set = useStudio((s) => s.set)
  const setCam = useStudio((s) => s.setCam)

  useEffect(() => {
    document.title = t('home.docTitle')
    set({ playing: true, speed: 0.5, focus: 'body', t: 0 })
    setCam('three-quarter')
  }, [set, setCam, t])

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:pt-20">
        <div className="max-w-prose">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{t('home.title')}</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{t('home.lead')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/path">{t('home.ctaStart')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/studio/forehand">{t('home.ctaStudio')}</Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-4/3 overflow-hidden rounded-xl border bg-muted shadow-sm">
          <StrokeScene stroke={forehand} />
        </div>
      </section>

      {/* Four entry points */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">{t('home.entriesTitle')}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ENTRIES.map(({ id, to, Icon }) => (
              <Link key={id} to={to} className="group rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                <Card className="h-full transition-colors group-hover:border-foreground/30">
                  <CardHeader>
                    <span className="mb-2 inline-flex size-9 items-center justify-center rounded-lg bg-primary/20 text-foreground">
                      <Icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-base leading-snug">{t(`home.entry.${id}.title`)}</CardTitle>
                    <CardDescription className="leading-6">{t(`home.entry.${id}.desc`)}</CardDescription>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium">
                      {t(`home.entry.${id}.cta`)}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How to use this */}
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">{t('home.howTitle')}</h2>
        <p className="mt-3 max-w-prose leading-7 text-muted-foreground">{t('home.howLead')}</p>
        <dl className="mt-8 grid gap-8 sm:grid-cols-3">
          {HOWTO.map((k) => (
            <div key={k} className="max-w-prose">
              <dt className="font-medium">{t(`home.how.${k}.title`)}</dt>
              <dd className="mt-1.5 text-sm leading-6 text-muted-foreground">{t(`home.how.${k}.body`)}</dd>
            </div>
          ))}
        </dl>
      </section>
      <Footer />
    </main>
  )
}
