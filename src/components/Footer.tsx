import { useT } from '@/i18n'

export function Footer() {
  const t = useT()
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        <p className="max-w-prose text-sm leading-6 text-muted-foreground">{t('footer.disclaimer')}</p>
        <p className="mt-3 max-w-prose text-xs leading-5 text-muted-foreground">
          {t('footer.credits')}{' '}
          <a className="underline underline-offset-2" href="https://github.com/jdpulgarin/Tennis-MoCap" target="_blank" rel="noreferrer">
            Tennis-MoCap
          </a>{' '}
          (Pulgarin-Giraldo et al., 2017,{' '}
          <a className="underline underline-offset-2" href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">
            CC BY-SA 3.0
          </a>
          ). {t('footer.credits.model')}
        </p>
      </div>
    </footer>
  )
}
