import React from 'react'
import { Box, CircularProgress } from '@mui/material'

interface LoadingOverlayProps {
  loading: boolean
  children: React.ReactNode
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading, children }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      {children}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 1,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}
