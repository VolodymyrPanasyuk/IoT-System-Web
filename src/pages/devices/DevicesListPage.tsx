import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button, Chip, IconButton, Tooltip } from '@mui/material'
import { Add as AddIcon, Visibility as ViewIcon } from '@mui/icons-material'
import type { MRT_ColumnDef } from 'material-react-table'
import { DataTable } from '@/components/common/DataTable/DataTable'
import { ConfirmDialog } from '@/components/common/ConfirmDialog/ConfirmDialog'
import { useCrud } from '@/hooks/useCrud'
import { useAuth } from '@/contexts/AuthContext'
import { devicesApiClient } from '@/api/system/devices'
import type { Device } from '@/types/api/device'
import { formatDateTime } from '@/utils/dateUtils'
import { APP_ROUTES } from '@/utils/constants'

export const DevicesListPage: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { items: devices, isLoading, fetchAll, remove } = useCrud(devicesApiClient, {
    entityName: 'Пристрій',
  })

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null)

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const handleView = (device: Device) => {
    navigate(`/devices/${device.id}`)
  }

  const handleCreate = () => {
    navigate(APP_ROUTES.DEVICE_MANAGE)
  }

  const handleEdit = (device: Device) => {
    navigate(`/devices/${device.id}/edit`)
  }

  const handleDelete = (device: Device) => {
    setDeviceToDelete(device)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (deviceToDelete) {
      const success = await remove(deviceToDelete.id)
      if (success) {
        setIsDeleteDialogOpen(false)
        setDeviceToDelete(null)
      }
    }
  }

  const columns: MRT_ColumnDef<Device>[] = [
    {
      accessorKey: 'name',
      header: 'Назва',
      size: 200,
    },
    {
      accessorKey: 'description',
      header: 'Опис',
      size: 250,
    },
    {
      accessorKey: 'isActive',
      header: 'Статус',
      size: 100,
      Cell: ({ cell }) => (
        <Chip
          label={cell.getValue<boolean>() ? 'Активний' : 'Неактивний'}
          color={cell.getValue<boolean>() ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      accessorKey: 'latitude',
      header: 'Координати',
      size: 150,
      Cell: ({ row }) => {
        const lat = row.original.latitude
        const lng = row.original.longitude
        if (lat && lng) {
          return `${lat.toFixed(4)}, ${lng.toFixed(4)}`
        }
        return '—'
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Створено',
      size: 160,
      Cell: ({ cell }) => formatDateTime(cell.getValue<string>()),
    },
  ]

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Пристрої</Typography>
        {isAuthenticated && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
            Додати пристрій
          </Button>
        )}
      </Box>

      <DataTable
        data={devices}
        columns={columns}
        isLoading={isLoading}
        onView={handleView}
        onEdit={isAuthenticated ? handleEdit : undefined}
        onDelete={isAuthenticated ? handleDelete : undefined}
        additionalActions={(row) => (
          <Tooltip title="Переглянути деталі">
            <IconButton size="small" onClick={() => handleView(row)}>
              <ViewIcon />
            </IconButton>
          </Tooltip>
        )}
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        title="Видалити пристрій"
        message={`Ви впевнені, що хочете видалити пристрій "${deviceToDelete?.name}"? Усі дані вимірювань також будуть видалені.`}
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false)
          setDeviceToDelete(null)
        }}
      />
    </Box>
  )
}
