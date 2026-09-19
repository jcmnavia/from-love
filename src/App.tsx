import { Route, Routes } from 'react-router-dom'
import { Shell } from './components/Shell'
import { HomePage } from './pages/HomePage'
import { StudioPage } from './pages/StudioPage'
import { SheetPage } from './pages/SheetPage'
import { LearnPage } from './pages/LearnPage'
import { MovePage } from './pages/MovePage'
import { ProsPage } from './pages/ProsPage'
import { PathPage } from './pages/PathPage'
import { useT } from './i18n'

function NotFound() {
  const t = useT()
  return <main className="mx-auto w-full max-w-7xl px-4 py-16 text-muted-foreground sm:px-6">{t('notFound')}</main>
}

export default function App() {
  return (
    <Routes>
      <Route path="/sheet/:strokeId" element={<SheetPage />} />
      <Route element={<Shell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/studio/:strokeId" element={<StudioPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/learn/:area" element={<LearnPage />} />
        <Route path="/move" element={<MovePage />} />
        <Route path="/pros" element={<ProsPage />} />
        <Route path="/path" element={<PathPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
