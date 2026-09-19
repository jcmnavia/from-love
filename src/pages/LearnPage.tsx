import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import type { Lesson, SectionId } from '@/content/types'
import { AREA_SOURCES } from '@/content/sources'
import { useContent } from '@/i18n/content'
import { useT } from '@/i18n'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/lib/use-media-query'
import { LessonView } from '@/components/LessonBlocks'
import { CourtExplorer } from '@/components/CourtViewer'
import { Scoreboard } from '@/components/Scoreboard'
import { GripExplorer } from '@/components/GripViewer'
import { Footer } from '@/components/Footer'
import { PageBody, PageHeader } from '@/components/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Area {
  id: string
  sections: SectionId[]
}

export const AREAS: Area[] = [
  { id: 'courts', sections: ['court'] },
  { id: 'balls', sections: ['balls'] },
  { id: 'scoring', sections: ['scoring'] },
  { id: 'rules', sections: ['rules', 'etiquette'] },
  { id: 'racquets', sections: ['racquets', 'strings'] },
  { id: 'grips', sections: ['grips'] },
  { id: 'footwork', sections: ['footwork', 'coordination'] },
  { id: 'fitness', sections: ['fitness'] },
  { id: 'tactics', sections: ['tactics'] },
  { id: 'mental', sections: ['mental'] },
]

const SURFACE_TINT: Record<string, string> = {
  hard: 'bg-court-hard/15 text-court-hard border-court-hard/30',
  clay: 'bg-court-clay/15 text-court-clay border-court-clay/30',
  grass: 'bg-court-grass/15 text-court-grass border-court-grass/30',
  indoor: 'bg-court-indoor/15 text-court-indoor border-court-indoor/30',
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-sm font-medium tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}

function Meter({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
      <div className="h-full rounded-full bg-primary" style={{ width: `${(value / max) * 100}%` }} />
    </div>
  )
}

/** The interactive part of an area: 3D court, scoreboard, grips handle, ball and racquet tables. */
function Feature({ area }: { area: string }) {
  const t = useT()
  const { surfaces, balls, racquets, juniorSizes, strings, strokes } = useContent()
  switch (area) {
    case 'courts':
      return (
        <Tabs defaultValue="court">
          <TabsList>
            <TabsTrigger value="court">{t('learn.feature.court3d')}</TabsTrigger>
            <TabsTrigger value="surfaces">{t('learn.feature.surfaces')}</TabsTrigger>
          </TabsList>
          <TabsContent value="court" className="mt-4">
            <CourtExplorer />
          </TabsContent>
          <TabsContent value="surfaces" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {surfaces.map((s) => (
                <Card key={s.id} size="sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Badge variant="outline" className={cn('font-medium', SURFACE_TINT[s.id])}>
                        {s.name}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="leading-6">{s.famousFor}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Fact value={t(`surface.speed.${s.speed}`)} label={t('surface.speedLabel')} />
                      <Fact value={t(`surface.bounce.${s.bounce}`)} label={t('surface.bounceLabel')} />
                    </div>
                    <Meter value={s.speed} />
                    <p className="text-sm leading-6 text-muted-foreground">
                      <b className="font-medium text-foreground">{t('surface.playIt')} </b>
                      {s.playingStyle}
                    </p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      <b className="font-medium text-foreground">{t('surface.moveOnIt')} </b>
                      {s.footwear}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )
    case 'balls':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {balls.map((b) => (
            <Card key={b.id} size="sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-block shrink-0 rounded-full shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.22)]"
                    style={{ width: 26 * b.size, height: 26 * b.size, background: BALL_SWATCH[b.id] ?? '#d9f03a' }}
                  />
                  {b.name}
                </CardTitle>
                <CardDescription className="leading-6">
                  <span className="block text-xs text-foreground/70">{b.color}</span>
                  {b.forWhom}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Fact value={`${Math.round(b.bounce * 100)}%`} label={t('ball.bounceVsStandard')} />
                  <Fact value={b.size === 1 ? t('ball.standard') : `${Math.round(b.size * 100)}%`} label={t('ball.size')} />
                </div>
                <Meter value={Math.min(b.bounce, 1)} max={1} />
                <p className="text-sm leading-6 text-muted-foreground">{b.where}</p>
                <p className="text-sm leading-6 text-muted-foreground">{b.notes}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    case 'scoring':
      return <Scoreboard />
    case 'grips':
      return <GripExplorer />
    case 'racquets':
      return (
        <Tabs defaultValue="types">
          <TabsList>
            <TabsTrigger value="types">{t('racquet.tab.types')}</TabsTrigger>
            <TabsTrigger value="junior">{t('racquet.tab.junior')}</TabsTrigger>
            <TabsTrigger value="strings">{t('racquet.tab.strings')}</TabsTrigger>
          </TabsList>
          <TabsContent value="types" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {racquets.map((r) => (
                <Card key={r.id} size="sm">
                  <CardHeader>
                    <CardTitle>{r.name}</CardTitle>
                    <CardDescription className="leading-6">{r.forWhom}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Fact value={r.headSize} label={t('racquet.headSize')} />
                      <Fact value={r.weight} label={t('racquet.weight')} />
                      <Fact value={r.balance} label={t('racquet.balance')} />
                      <Fact value={r.stringPattern} label={t('racquet.pattern')} />
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">{r.feel}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="junior" className="mt-4">
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('racquet.junior.length')}</TableHead>
                    <TableHead>{t('racquet.junior.age')}</TableHead>
                    <TableHead>{t('racquet.junior.height')}</TableHead>
                    <TableHead>{t('racquet.junior.ball')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {juniorSizes.map((j) => (
                    <TableRow key={j.length}>
                      <TableCell className="font-medium tabular-nums">{j.length}</TableCell>
                      <TableCell className="tabular-nums">{j.ageRange}</TableCell>
                      <TableCell className="tabular-nums">{j.heightRange}</TableCell>
                      <TableCell>{j.ballStage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="strings" className="mt-4">
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('racquet.strings.name')}</TableHead>
                    <TableHead>{t('racquet.strings.feel')}</TableHead>
                    <TableHead>{t('racquet.strings.durability')}</TableHead>
                    <TableHead>{t('racquet.strings.for')}</TableHead>
                    <TableHead>{t('racquet.strings.tension')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {strings.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell className="whitespace-normal">{s.feel}</TableCell>
                      <TableCell>{s.durability}</TableCell>
                      <TableCell className="whitespace-normal">{s.forWhom}</TableCell>
                      <TableCell className="tabular-nums">{s.tension}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      )
    case 'footwork':
      return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {strokes
            .filter((s) => s.category === 'movement')
            .map((s) => (
              <Link key={s.id} to={`/studio/${s.id}`} className="group rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                <Card size="sm" className="h-full transition-colors group-hover:border-foreground/30">
                  <CardHeader>
                    <CardTitle>{s.name}</CardTitle>
                    <CardDescription className="leading-6">{s.tagline}</CardDescription>
                    <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium">
                      {t('learn.watch3d')}
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </span>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          <Link to="/move" className="group rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            <Card size="sm" className="h-full transition-colors group-hover:border-foreground/30">
              <CardHeader>
                <CardTitle>{t('learn.drillsCard.title')}</CardTitle>
                <CardDescription className="leading-6">{t('learn.drillsCard.desc')}</CardDescription>
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium">
                  {t('learn.drillsCard.cta')}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </CardHeader>
            </Card>
          </Link>
        </div>
      )
    default:
      return null
  }
}

/** CSS colours for the ball swatches; the data's `color` field is a description for the reader. */
const BALL_SWATCH: Record<string, string> = {
  'red-foam': '#d9312b',
  'red-felt': 'linear-gradient(135deg, #d9312b 50%, #d9f03a 50%)',
  orange: 'linear-gradient(135deg, #f28c1e 50%, #d9f03a 50%)',
  green: 'linear-gradient(135deg, #2fa84f 50%, #d9f03a 50%)',
  'standard-regular-duty': '#d9f03a',
  'standard-extra-duty': '#d9f03a',
  pressureless: '#cfe23a',
  'high-altitude': '#e6f56e',
}

const HAS_FEATURE = new Set(['courts', 'balls', 'scoring', 'grips', 'racquets', 'footwork'])

export function LearnPage() {
  const t = useT()
  const navigate = useNavigate()
  const { area: areaId } = useParams()
  const { lessons: allLessons } = useContent()
  const area = AREAS.find((a) => a.id === areaId)
  const lessons = useMemo<Lesson[]>(() => (area ? allLessons.filter((l) => area.sections.includes(l.section)) : []), [area, allLessons])
  const [current, setCurrent] = useState<string | null>(null)
  const desktop = useMediaQuery('(min-width: 1024px)')
  const [tryOpen, setTryOpen] = useState(desktop)

  useEffect(() => setCurrent(lessons[0]?.id ?? null), [lessons])
  useEffect(() => setTryOpen(desktop), [desktop, areaId])
  useEffect(() => {
    if (area) document.title = `${t(`learn.area.${area.id}.title`)} · ${t('brand')}`
  }, [area, t])

  if (!areaId) return <Navigate to="/learn/courts" replace />
  if (!area) return <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-16 text-muted-foreground sm:px-6">{t('learn.noTopic')}</main>
  const lesson = lessons.find((l) => l.id === current) ?? lessons[0]

  return (
    <main className="flex-1">
      <PageHeader title={t(`learn.area.${area.id}.title`)} description={t(`learn.area.${area.id}.intro`)} className="pb-4 sm:pb-4" />
      <PageBody>
        {/* Topic navigation */}
        <nav aria-label={t('learn.topics')} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <ul className="flex w-max gap-1 border-b pb-3">
            {AREAS.map((a) => (
              <li key={a.id}>
                <NavLink
                  to={`/learn/${a.id}`}
                  className={({ isActive }) =>
                    cn(
                      'inline-flex h-8 items-center rounded-md px-3 text-sm whitespace-nowrap transition-colors',
                      isActive ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )
                  }
                >
                  {t(`learn.area.${a.id}.title`)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Try it */}
        {HAS_FEATURE.has(area.id) && (
          <Collapsible open={tryOpen} onOpenChange={setTryOpen} className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle>{t('learn.tryIt')}</CardTitle>
                  <CardDescription>{t(`learn.feature.${area.id}`)}</CardDescription>
                </div>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm" aria-expanded={tryOpen}>
                    {tryOpen ? t('common.hide') : t('common.show')}
                    <ChevronDown data-icon="inline-end" className={cn('transition-transform', tryOpen && 'rotate-180')} />
                  </Button>
                </CollapsibleTrigger>
              </CardHeader>
              <CollapsibleContent>
                <CardContent>{tryOpen && <Feature area={area.id} />}</CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )}

        {/* One lesson at a time */}
        {lesson && (
          <div className="mt-10 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
            <div className="lg:hidden">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="lesson-select">
                {t('learn.lessonsIn', { n: lessons.length })}
              </label>
              <Select value={lesson.id} onValueChange={setCurrent}>
                <SelectTrigger id="lesson-select" className="mt-1.5 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lessons.map((l) => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <nav aria-label={t('learn.lessons')} className="hidden lg:block">
              <div className="sticky top-20">
                <div className="text-xs font-medium text-muted-foreground">{t('learn.lessonsIn', { n: lessons.length })}</div>
                <ol className="mt-2 space-y-0.5 border-l">
                  {lessons.map((l) => {
                    const active = l.id === lesson.id
                    return (
                      <li key={l.id}>
                        <button
                          onClick={() => setCurrent(l.id)}
                          aria-current={active ? 'true' : undefined}
                          className={cn(
                            '-ml-px block w-full border-l-2 py-1.5 pl-3 text-left text-sm leading-snug transition-colors',
                            active ? 'border-primary font-medium text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
                          )}
                        >
                          {l.title}
                          <span className="block text-xs text-muted-foreground tabular-nums">{t('lesson.minutes', { n: l.minutes })}</span>
                        </button>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </nav>
            <div className="min-w-0">
              <LessonView lesson={lesson} extraSources={AREA_SOURCES[area.id] ?? []} />
              <div className="mt-10 flex flex-col gap-2 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                {(() => {
                  const i = lessons.findIndex((l) => l.id === lesson.id)
                  const prev = lessons[i - 1]
                  const next = lessons[i + 1]
                  return (
                    <>
                      {prev ? (
                        <Button variant="ghost" onClick={() => setCurrent(prev.id)} className="min-w-0 justify-start sm:max-w-[48%]">
                          <span className="truncate">
                            {t('common.previous')}: {prev.title}
                          </span>
                        </Button>
                      ) : (
                        <span className="hidden sm:block" />
                      )}
                      {next ? (
                        <Button onClick={() => setCurrent(next.id)} className="min-w-0 sm:max-w-[48%]">
                          <span className="truncate">
                            {t('common.next')}: {next.title}
                          </span>
                        </Button>
                      ) : (
                        <Button variant="outline" onClick={() => navigate(`/learn/${AREAS[(AREAS.findIndex((a) => a.id === area.id) + 1) % AREAS.length].id}`)}>
                          {t('learn.nextTopic')}
                          <ArrowRight data-icon="inline-end" />
                        </Button>
                      )}
                    </>
                  )
                })()}
              </div>
            </div>
          </div>
        )}
      </PageBody>
      <Footer />
    </main>
  )
}
