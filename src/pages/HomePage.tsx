import React from 'react'
import { Box, Typography, Paper, Grid } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'

export const HomePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth()

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Вітаємо в IoT System
      </Typography>

      {isAuthenticated && user && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Привіт, {user.firstName} {user.lastName}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ви увійшли як <strong>@{user.userName}</strong>
          </Typography>
          {user.roles && user.roles.length > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Ролі: {user.roles.join(', ')}
            </Typography>
          )}
        </Paper>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Про систему
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Система моніторингу та аналізу даних з IoT пристроїв. Підключайте пристрої,
              налаштовуйте збір даних, відстежуйте показники в реальному часі.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Можливості
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              <ul>
                <li>Моніторинг пристроїв в реальному часі</li>
                <li>Налаштування граничних значень</li>
                <li>Сповіщення про перевищення порогів</li>
                <li>Візуалізація даних</li>
                <li>Гнучке управління доступом</li>
              </ul>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
