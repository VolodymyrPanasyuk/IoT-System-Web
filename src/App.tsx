import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { uk } from 'date-fns/locale'
import { NotificationProvider } from '@/contexts/NotificationContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { GlobalLoader } from '@/components/common/GlobalLoader/GlobalLoader'
import { AppRoutes } from '@/routes/AppRoutes'
import { theme } from '@/theme/theme'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
          <NotificationProvider>
            <AuthProvider>
              <GlobalLoader />
              <AppRoutes />
            </AuthProvider>
          </NotificationProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
