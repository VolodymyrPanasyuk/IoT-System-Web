import React, { createContext, useContext, useState, useCallback } from 'react'
import { Snackbar, Alert, type AlertColor } from '@mui/material'
import type { Notification, NotificationType } from '@/types/common'
import { NOTIFICATION_DURATION } from '@/utils/constants'

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType, duration?: number) => void
  showSuccess: (message: string) => void
  showError: (message: string) => void
  showWarning: (message: string) => void
  showInfo: (message: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null)

  const showNotification = useCallback(
    (message: string, type: NotificationType = 'info', duration = NOTIFICATION_DURATION.MEDIUM) => {
      setNotification({
        id: Date.now().toString(),
        message,
        type,
        duration,
      })
    },
    []
  )

  const showSuccess = useCallback((message: string) => {
    showNotification(message, 'success', NOTIFICATION_DURATION.SHORT)
  }, [showNotification])

  const showError = useCallback((message: string) => {
    showNotification(message, 'error', NOTIFICATION_DURATION.LONG)
  }, [showNotification])

  const showWarning = useCallback((message: string) => {
    showNotification(message, 'warning', NOTIFICATION_DURATION.MEDIUM)
  }, [showNotification])

  const showInfo = useCallback((message: string) => {
    showNotification(message, 'info', NOTIFICATION_DURATION.MEDIUM)
  }, [showNotification])

  const handleClose = () => {
    setNotification(null)
  }

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}
      {notification && (
        <Snackbar
          open={true}
          autoHideDuration={notification.duration}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleClose}
            severity={notification.type as AlertColor}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext.Provider>
  )
}

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}
