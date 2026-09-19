import { Link, useNavigate } from 'react-router-dom'
import type { StrokeCategory } from '@/engine/types'
import { useContent } from '@/i18n/content'
import { useT } from '@/i18n'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

const ORDER: StrokeCategory[] = ['groundstroke', 'serve', 'net', 'specialty', 'movement']

const LEVEL_DOT: Record<string, string> = {
  beginner: 'bg-muted-foreground/40',
  intermediate: 'bg-muted-foreground',
  advanced: 'bg-foreground',
}

/** Slim sidebar for desktop. */
export function StrokeList({ activeId, className }: { activeId: string; className?: string }) {
  const t = useT()
  const { strokes } = useContent()
  return (
    <aside className={cn('text-sm', className)} aria-label={t('studio.strokes')}>
      <div className="sticky top-20 space-y-5">
        {ORDER.map((cat) => (
          <div key={cat}>
            <h2 className="mb-1.5 text-xs font-medium text-muted-foreground">{t(`category.${cat}`)}</h2>
            <ul className="space-y-0.5">
              {strokes
                .filter((s) => s.category === cat)
                .map((s) => {
                  const active = s.id === activeId
                  return (
                    <li key={s.id}>
                      <Link
                        to={`/studio/${s.id}`}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors',
                          active ? 'bg-primary/20 font-medium text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                        )}
                      >
                        <span className={cn('size-1.5 shrink-0 rounded-full', LEVEL_DOT[s.level])} title={t(`level.${s.level}`)} aria-hidden="true" />
                        <span className="truncate">{s.name}</span>
                      </Link>
                    </li>
                  )
                })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}

/** Grouped select for small screens. */
export function StrokeSelect({ activeId }: { activeId: string }) {
  const t = useT()
  const navigate = useNavigate()
  const { strokes } = useContent()
  return (
    <Select value={activeId} onValueChange={(id) => navigate(`/studio/${id}`)}>
      <SelectTrigger className="w-full" aria-label={t('studio.strokes')}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ORDER.map((cat) => (
          <SelectGroup key={cat}>
            <SelectLabel>{t(`category.${cat}`)}</SelectLabel>
            {strokes
              .filter((s) => s.category === cat)
              .map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}
