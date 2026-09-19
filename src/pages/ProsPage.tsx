import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { DECADES, STROKE_TAG_LABEL, type Decade, type ProPlayer } from '@/data/players'
import { useContent } from '@/i18n/content'
import { useT } from '@/i18n'
import { cn } from '@/lib/utils'
import { Footer } from '@/components/Footer'
import { PageBody, PageHeader } from '@/components/PageHeader'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type Tour = 'all' | 'ATP' | 'WTA'
const NEWEST_FIRST: Decade[] = [...DECADES].reverse()

function PlayerCard({ p, tag }: { p: ProPlayer; tag: string }) {
  const t = useT()
  const [srcOpen, setSrcOpen] = useState(false)
  const notes = p.techniqueNotes.filter((n) => tag === 'all' || n.stroke === tag)
  return (
    <Card size="sm" className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-base">{p.name}</CardTitle>
            <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">
              {p.country} · {p.tour} · {t('pros.majors', { n: p.slams })}
            </p>
          </div>
          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold tabular-nums"
            title={t('pros.rankTitle', { n: p.rankInDecade, tour: p.tour })}
          >
            {p.rankInDecade}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Badge variant="secondary">{t(`style.${p.style}`)}</Badge>
          <Badge variant="outline">{t(`hand.${p.hand}`)}</Badge>
          <Badge variant="outline">{t(`backhand.${p.backhand}`)}</Badge>
          <Badge variant="outline">{t('pros.gripFor', { grip: t(`gripName.${p.forehandGrip}`) })}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-6">
        {notes.map((n) => (
          <p key={n.stroke + n.note.slice(0, 12)}>
            <b className="font-medium">{t(`strokeTag.${n.stroke}`)}.</b>{' '}
            <span className="text-foreground/85">{n.note}</span>
          </p>
        ))}
        <p className="border-l-2 border-primary pl-3 text-muted-foreground">{p.lesson}</p>
        {p.sources.length > 0 && (
          <Collapsible open={srcOpen} onOpenChange={setSrcOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="xs" className="-ml-2 text-muted-foreground" aria-expanded={srcOpen}>
                {t('sources.title')}
                <ChevronDown data-icon="inline-end" className={cn('transition-transform', srcOpen && 'rotate-180')} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="mt-1 space-y-1 text-xs break-all text-muted-foreground">
                {p.sources.map((s) => (
                  <li key={s}>
                    <a href={s} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">
                      {s.replace(/^https?:\/\//, '')}
                    </a>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  )
}

export function ProsPage() {
  const t = useT()
  const { players } = useContent()
  const [tour, setTour] = useState<Tour>('all')
  const [tag, setTag] = useState<string>('all')
  const [query, setQuery] = useState('')
  useEffect(() => {
    document.title = `${t('nav.pros')} · ${t('brand')}`
  }, [t])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return players.filter(
      (p) =>
        (tour === 'all' || p.tour === tour) &&
        (tag === 'all' || p.signature.includes(tag) || p.techniqueNotes.some((n) => n.stroke === tag)) &&
        (q === '' || p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q)),
    )
  }, [players, tour, tag, query])

  const decadesWithResults = NEWEST_FIRST.filter((d) => filtered.some((p) => p.decade === d))
  const open = query ? decadesWithResults : ['2020s']

  return (
    <main className="flex-1">
      <PageHeader title={t('pros.title')} description={t('pros.lead')} />
      <PageBody>
        <div className="flex flex-wrap items-center gap-3">
          <ToggleGroup
            type="single"
            variant="outline"
            spacing={0}
            value={tour}
            onValueChange={(v) => v && setTour(v as Tour)}
            aria-label={t('pros.tour')}
          >
            <ToggleGroupItem value="all">{t('pros.bothTours')}</ToggleGroupItem>
            <ToggleGroupItem value="ATP">ATP</ToggleGroupItem>
            <ToggleGroupItem value="WTA">WTA</ToggleGroupItem>
          </ToggleGroup>
          <Select value={tag} onValueChange={setTag}>
            <SelectTrigger className="w-full sm:w-52" aria-label={t('pros.stroke')}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('pros.everyStroke')}</SelectItem>
              {Object.keys(STROKE_TAG_LABEL).map((id) => (
                <SelectItem key={id} value={id}>
                  {t(`strokeTag.${id}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('pros.searchPlaceholder')} aria-label={t('pros.search')} className="pl-8" />
          </div>
          <span className="text-sm text-muted-foreground tabular-nums sm:ml-auto">{t('pros.count', { n: filtered.length })}</span>
        </div>

        {decadesWithResults.length === 0 ? (
          <p className="mt-10 text-muted-foreground">{t('pros.empty')}</p>
        ) : (
          <Accordion type="multiple" key={open.join(',')} defaultValue={open} className="mt-6">
            {decadesWithResults.map((d) => {
              const list = filtered.filter((p) => p.decade === d)
              return (
                <AccordionItem key={d} value={d}>
                  <AccordionTrigger className="py-4 text-lg font-semibold hover:no-underline">
                    <span className="flex items-baseline gap-3">
                      {d}
                      <span className="text-sm font-normal text-muted-foreground tabular-nums">{t('pros.count', { n: list.length })}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8">
                    <p className="max-w-prose leading-7 text-muted-foreground">{t(`pros.decade.${d}`)}</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {list.map((p) => (
                        <PlayerCard key={p.id} p={p} tag={tag} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        )}
      </PageBody>
      <Footer />
    </main>
  )
}
