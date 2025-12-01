import React, { useMemo } from 'react'
import { Box } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { MeasurementWithThresholds } from '@/types/api/deviceMeasurement'
import { formatDateTime } from '@/utils/dateUtils'

interface MeasurementChartProps {
  measurements: MeasurementWithThresholds[]
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0']

export const MeasurementChart: React.FC<MeasurementChartProps> = ({ measurements }) => {
  const chartData = useMemo(() => {
    return measurements
      .slice()
      .reverse()
      .map((m) => {
        const dataPoint: Record<string, string | number> = {
          date: formatDateTime(m.measurementDate),
        }

        m.values.forEach((v) => {
          if (v.numericValue !== null && v.numericValue !== undefined) {
            dataPoint[v.fieldName] = v.numericValue
          }
        })

        return dataPoint
      })
  }, [measurements])

  const fields = useMemo(() => {
    if (measurements.length === 0) return []

    const firstMeasurement = measurements[0]
    return firstMeasurement.values
      .filter((v) => v.numericValue !== null && v.numericValue !== undefined)
      .map((v) => v.fieldName)
  }, [measurements])

  if (chartData.length === 0) {
    return null
  }

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          {fields.map((field, index) => (
            <Line
              key={field}
              type="monotone"
              dataKey={field}
              stroke={COLORS[index % COLORS.length]}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}