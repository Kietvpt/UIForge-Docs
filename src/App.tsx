import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { LanguageProvider } from '@/i18n/LanguageContext'
import { HomePage } from '@/pages/HomePage'
import { GuidePage } from '@/pages/GuidePage'
import { ComponentDetailPage } from '@/pages/ComponentDetailPage'

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/docs/:slug" element={<GuidePage />} />
            <Route path="/components/:slug" element={<ComponentDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
