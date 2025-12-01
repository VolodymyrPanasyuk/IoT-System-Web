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
  Grid,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/contexts/AuthContext'
import { registerSchema, type RegisterFormData } from '@/utils/validators'
import { APP_ROUTES } from '@/utils/constants'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { register: registerUser, isAuthenticated } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(APP_ROUTES.HOME)
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data)
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
            Реєстрація
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Створіть обліковий запис в системі IoT моніторингу
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

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('firstName')}
                  label="Ім'я"
                  fullWidth
                  margin="normal"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('lastName')}
                  label="Прізвище"
                  fullWidth
                  margin="normal"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  autoComplete="family-name"
                />
              </Grid>
            </Grid>

            <TextField
              {...register('password')}
              label="Пароль"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="new-password"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isSubmitting}
              sx={{ mt: 3, mb: 2 }}
            >
              {isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                Вже є обліковий запис?{' '}
                <Link component={RouterLink} to={APP_ROUTES.LOGIN}>
                  Увійти
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  )
}
