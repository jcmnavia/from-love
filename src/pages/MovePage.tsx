import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import type { Drill } from '@/content/types'
import { useContent } from '@/i18n/content'
import { useT } from '@/i18n'
import { cn } from '@/lib/utils'
import { DrillDiagram } from '@/components/DrillDiagram'
import { Footer } from '@/components/Footer'
import { PageBody, PageHeader } from '@/components/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type Section = Drill['section']
const SECTIONS: Section[] = ['footwork', 'coordination', 'fitness']

function DrillCard({ drill }: { drill: Drill }) {
  const t = useT()
  const [open, setOpen] = useState(false)
  return (
    <Card id={drill.id} size="sm">
      <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_200px]">
        <div className="min-w-0">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{t(`level.${drill.level}`)}</Badge>
              {drill.studio && (
                <Badge variant="outline" asChild>
                  <Link to={`/studio/${drill.studio}`}>{t('drill.in3d')}</Link>
                </Badge>
              )}
            </div>
            <CardTitle className="mt-1 text-lg">{drill.name}</CardTitle>
            <CardDescription className="max-w-prose leading-6">{drill.goal}</CardDescription>
          </CardHeader>
          <CardContent>
            <Collapsible open={open} onOpenChange={setOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" aria-expanded={open}>
                  {open ? t('drill.hideSteps') : t('drill.showSteps')}
                  <ChevronDown data-icon="inline-end" className={cn('transition-transform', open && 'rotate-180')} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 max-w-prose space-y-4 text-sm leading-6">
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
                  <dt className="text-muted-foreground">{t('drill.equipment')}</dt>
                  <dd>{drill.equipment}</dd>
                  <dt className="text-muted-foreground">{t('drill.setup')}</dt>
                  <dd>{drill.setup}</dd>
                  <dt className="text-muted-foreground">{t('drill.reps')}</dt>
                  <dd className="tabular-nums">{drill.reps}</dd>
                </dl>
                <ol className="space-y-2">
                  {drill.steps.map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold tabular-nums">
                        {i + 1}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                <div className="rounded-lg border border-l-4 border-l-primary bg-muted/40 px-3 py-2">
                  <b className="font-medium">{t('drill.cues')} </b>
                  <span className="text-muted-foreground">{drill.coachingCues.join(' · ')}</span>
                </div>
                {drill.studio && (
                  <Button asChild variant="link" className="px-0">
                    <Link to={`/studio/${drill.studio}`}>
                      {t('drill.watch3d')}
                      <ArrowRight data-icon="inline-end" />
                    </Link>
                  </Button>
                )}
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </div>
        {drill.pattern && (
          <div className="px-4 pb-4 sm:py-4 sm:pl-0">
            <DrillDiagram pattern={drill.pattern} className="mx-auto max-w-[220px]" />
          </div>
        )}
      </div>
    </Card>
  )
}

export function MovePage() {
  const t = useT()
  const { drills: all } = useContent()
  const [section, setSection] = useState<Section>('footwork')
  const drills = all.filter((d) => d.section === section)
  useEffect(() => {
    document.title = `${t('nav.move')} · ${t('brand')}`
  }, [t])
  return (
    <main className="flex-1">
      <PageHeader title={t('move.title')} description={t('move.lead')} />
      <PageBody>
        <ToggleGroup
          type="single"
          variant="outline"
          spacing={0}
          value={section}
          onValueChange={(v) => v && setSection(v as Section)}
          aria-label={t('move.filter')}
          className="max-w-full overflow-x-auto"
        >
          {SECTIONS.map((id) => (
            <ToggleGroupItem key={id} value={id} className="whitespace-nowrap">
              {t(`move.section.${id}`)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <p className="mt-3 max-w-prose text-sm leading-6 text-muted-foreground">{t(`move.section.${section}.intro`)}</p>
        <div className="mt-6 grid gap-4">
          {drills.map((d) => (
            <DrillCard key={d.id} drill={d} />
          ))}
        </div>
      </PageBody>
      <Footer />
    </main>
  )
}
