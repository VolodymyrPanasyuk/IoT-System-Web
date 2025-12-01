import React from 'react'
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material'
import { useLoadingStore } from '@/store/loadingStore'

export const GlobalLoader: React.FC = () => {
  const { globalLoading, globalLoadingMessage } = useLoadingStore()

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1000,
        flexDirection: 'column',
        gap: 2,
      }}
      open={globalLoading}
    >
      <CircularProgress color="inherit" size={60} />
      {globalLoadingMessage && (
        <Box>
          <Typography variant="h6">{globalLoadingMessage}</Typography>
        </Box>
      )}
    </Backdrop>
  )
}
