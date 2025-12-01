import React from 'react'
import { Box, Container } from '@mui/material'
import { Navigation } from '../Navigation/Navigation'
import { Header } from '../Header/Header'

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navigation />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Container
          maxWidth="xl"
          sx={{
            flex: 1,
            py: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  )
}
