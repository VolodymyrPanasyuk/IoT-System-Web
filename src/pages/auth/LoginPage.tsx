import React from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/contexts/AuthContext'
import { loginSchema, type LoginFormData } from '@/utils/validators'
import { APP_ROUTES } from '@/utils/constants'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(APP_ROUTES.HOME)
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data)
    } catch (error) {
      // Error handled by AuthContext
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Вхід
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Увійдіть до системи IoT моніторингу
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('userName')}
              label="Ім'я користувача"
              fullWidth
              margin="normal"
              error={!!errors.userName}
              helperText={errors.userName?.message}
              autoComplete="username"
            />

            <TextField
              {...register('password')}
              label="Пароль"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isSubmitting}
              sx={{ mt: 3, mb: 2 }}
            >
              {isSubmitting ? 'Вхід...' : 'Увійти'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                Немає облікового запису?{' '}
                <Link component={RouterLink} to={APP_ROUTES.REGISTER}>
                  Зареєструватися
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  )
}
