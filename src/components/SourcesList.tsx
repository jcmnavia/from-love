import { ExternalLink } from 'lucide-react'
import { sourceById } from '@/content/sources'
import type { Source } from '@/content/types'
import { useT } from '@/i18n'

/** Official references for a lesson or stroke. Renders nothing when there are none. */
export function SourcesList({ ids, className }: { ids: string[]; className?: string }) {
  const t = useT()
  const list = Array.from(new Set(ids)).map(sourceById).filter((s): s is Source => Boolean(s))
  if (list.length === 0) return null
  return (
    <section className={className} aria-label={t('sources.title')}>
      <h3 className="text-sm font-medium text-foreground">{t('sources.title')}</h3>
      <ul className="mt-2 space-y-1.5 text-sm">
        {list.map((s) => (
          <li key={s.id} className="flex flex-wrap items-baseline gap-x-1.5">
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              {s.name}
              <ExternalLink className="size-3 text-muted-foreground" aria-hidden="true" />
            </a>
            <span className="text-muted-foreground">{s.org}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
