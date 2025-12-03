import React from 'react'
import { Box, Container } from '@mui/material'
import { Navigation } from '../Navigation/Navigation'
import { Header } from '../Header/Header'
import { Outlet } from 'react-router-dom'

interface AppLayoutProps {
}

const DRAWER_WIDTH: number = 240 as const;

export const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', maxWidth: '100vw', width: 'auto' }}>
      <Navigation drawerWidth={DRAWER_WIDTH} />
      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH}px)` }, maxHeight: '100%' }}>
        <Header />
        <Container
          sx={{
            py: 3,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}
