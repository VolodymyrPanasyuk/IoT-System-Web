import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  CircularProgress,
} from '@mui/material'
import type { MRT_ColumnDef } from 'material-react-table'
import { DataTable } from '@/components/common/DataTable/DataTable'
import { MeasurementChart } from '@/components/charts/MeasurementChart/MeasurementChart'
import { useApiRequestOnMount } from '@/hooks/useApiRequest'
import { useSignalR } from '@/hooks/useSignalR'
import { devicesApiClient } from '@/api/system/devices'
import { deviceMeasurementsApiClient } from '@/api/system/deviceMeasurements'
import type { MeasurementWithThresholds } from '@/types/api/deviceMeasurement'
import { formatDateTime } from '@/utils/dateUtils'
import { PageLoader } from '@/components/common/PageLoader/PageLoader'

export const DeviceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [measurements, setMeasurements] = useState<MeasurementWithThresholds[]>([])
  const [isMeasurementsLoading, setIsMeasurementsLoading] = useState(true)

  const { data: device, isLoading: isDeviceLoading } = useApiRequestOnMount(
    () => devicesApiClient.getById(id!),
    { showErrorNotification: true }
  )

  const { subscribeToDevice, unsubscribeFromDevice } = useSignalR({
    onMeasurementAdded: () => {
      loadMeasurements()
    },
  })

  useEffect(() => {
    if (id) {
      loadMeasurements()
      subscribeToDevice(id)
    }

    return () => {
      if (id) {
        unsubscribeFromDevice(id)
      }
    }
  }, [id, subscribeToDevice, unsubscribeFromDevice])

  const loadMeasurements = async () => {
    if (!id) return
    try {
      setIsMeasurementsLoading(true)
      const data = await deviceMeasurementsApiClient.getByDeviceWithThresholds(id)
      setMeasurements(data)
    } catch (error) {
      console.error('Failed to load measurements:', error)
    } finally {
      setIsMeasurementsLoading(false)
    }
  }

  if (isDeviceLoading) {
    return <PageLoader message="Завантаження пристрою..." />
  }

  if (!device) {
    return (
      <Box>
        <Typography variant="h5">Пристрій не знайдено</Typography>
      </Box>
    )
  }

  const columns: MRT_ColumnDef<MeasurementWithThresholds>[] = [
    {
      accessorKey: 'measurementDate',
      header: 'Дата вимірювання',
      size: 180,
      Cell: ({ cell }) => formatDateTime(cell.getValue<string>()),
    },
    {
      accessorKey: 'values',
      header: 'Значення',
      size: 400,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {row.original.values.map((value) => (
            <Chip
              key={value.id}
              label={`${value.fieldName}: ${value.value}`}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      ),
    },
    {
      accessorKey: 'thresholdStatuses',
      header: 'Статус порогів',
      size: 200,
      Cell: ({ row }) => {
        const warnings = row.original.thresholdStatuses.filter((t) => t.status === 'Warning')
        const criticals = row.original.thresholdStatuses.filter((t) => t.status === 'Critical')

        return (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {criticals.length > 0 && (
              <Chip label={`Критичні: ${criticals.length}`} size="small" color="error" />
            )}
            {warnings.length > 0 && (
              <Chip label={`Попередження: ${warnings.length}`} size="small" color="warning" />
            )}
            {criticals.length === 0 && warnings.length === 0 && (
              <Chip label="Норма" size="small" color="success" />
            )}
          </Box>
        )
      },
    },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {device.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Інформація про пристрій
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Опис:
                </Typography>
                <Typography variant="body1">{device.description || '—'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Статус:
                </Typography>
                <Chip
                  label={device.isActive ? 'Активний' : 'Неактивний'}
                  color={device.isActive ? 'success' : 'default'}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Координати:
                </Typography>
                <Typography variant="body1">
                  {device.latitude && device.longitude
                    ? `${device.latitude.toFixed(6)}, ${device.longitude.toFixed(6)}`
                    : '—'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Створено:
                </Typography>
                <Typography variant="body1">{formatDateTime(device.createdAt)}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Графіки вимірювань
            </Typography>
            {isMeasurementsLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : measurements.length > 0 ? (
              <MeasurementChart measurements={measurements} />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Немає даних для відображення
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Історія вимірювань
            </Typography>
            <DataTable
              data={measurements}
              columns={columns}
              isLoading={isMeasurementsLoading}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
