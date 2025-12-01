import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button, Container } from '@mui/material'
import { Home as HomeIcon } from '@mui/icons-material'
import { APP_ROUTES } from '@/utils/constants'

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" component="h1" sx={{ fontSize: '6rem', fontWeight: 'bold' }}>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Сторінку не знайдено
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Вибачте, але сторінка, яку ви шукаєте, не існує.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate(APP_ROUTES.HOME)}
        >
          На головну
        </Button>
      </Box>
    </Container>
  )
}
