import { useT } from '@/i18n'

export function Footer() {
  const t = useT()
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        <p className="max-w-prose text-sm leading-6 text-muted-foreground">{t('footer.disclaimer')}</p>
      </div>
    </footer>
  )
}
