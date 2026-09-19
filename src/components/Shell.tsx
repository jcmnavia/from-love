import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useLocale, useT, type Locale } from '@/i18n'
import { useTheme } from './ThemeProvider'

const NAV: { to: string; key: string }[] = [
  { to: '/learn', key: 'nav.learn' },
  { to: '/studio', key: 'nav.studio' },
  { to: '/move', key: 'nav.move' },
  { to: '/pros', key: 'nav.pros' },
  { to: '/path', key: 'nav.path' },
]

function Brand() {
  const t = useT()
  return (
    <NavLink to="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <span aria-hidden="true" className="inline-block size-3.5 rounded-full bg-primary ring-2 ring-primary/30" />
      <span>{t('brand')}</span>
    </NavLink>
  )
}

export function ThemeToggle() {
  const { resolved, setTheme } = useTheme()
  const t = useT()
  const next = resolved === 'dark' ? 'light' : 'dark'
  const label = resolved === 'dark' ? t('theme.light') : t('theme.dark')
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={label} onClick={() => setTheme(next)}>
          {resolved === 'dark' ? <Sun /> : <Moon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale()
  const t = useT()
  return (
    <ToggleGroup
      type="single"
      size="sm"
      variant="outline"
      spacing={0}
      value={locale}
      onValueChange={(v) => v && setLocale(v as Locale)}
      aria-label={t('lang.label')}
      className={className}
    >
      <ToggleGroupItem value="en" aria-label="English" className="px-2.5 text-xs">
        EN
      </ToggleGroupItem>
      <ToggleGroupItem value="es" aria-label="Español" className="px-2.5 text-xs">
        ES
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function Shell() {
  const { pathname } = useLocation()
  const t = useT()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setOpen(false)
  }, [pathname])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'rounded-md px-2.5 py-1.5 text-sm transition-colors hover:text-foreground',
      isActive ? 'font-medium text-foreground' : 'text-muted-foreground',
    )

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/75">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-2 px-4 sm:px-6">
          <Brand />
          <nav aria-label={t('nav.main')} className="ml-6 hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className={linkClass}>
                {t(n.key)}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1.5">
            <LanguageSwitcher className="hidden sm:flex" />
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t('nav.menu')}>
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle>{t('brand')}</SheetTitle>
                </SheetHeader>
                <nav aria-label={t('nav.main')} className="flex flex-col gap-1 px-4">
                  {NAV.map((n) => (
                    <NavLink
                      key={n.to}
                      to={n.to}
                      className={({ isActive }) =>
                        cn(
                          'rounded-md px-3 py-2 text-sm hover:bg-muted',
                          isActive ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground',
                        )
                      }
                    >
                      {t(n.key)}
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-auto flex items-center justify-between px-4 pb-4">
                  <span className="text-sm text-muted-foreground">{t('lang.label')}</span>
                  <LanguageSwitcher />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
