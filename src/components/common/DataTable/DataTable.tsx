import React from 'react'
import { Box } from '@mui/material'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table'
import { MRT_Localization_UK } from 'material-react-table/locales/uk'
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material'

interface DataTableProps<TData extends Record<string, any>> {
  data: TData[]
  columns: MRT_ColumnDef<TData>[]
  isLoading?: boolean
  onView?: (row: TData) => void
  onEdit?: (row: TData) => void
  onDelete?: (row: TData) => void
  enableRowActions?: boolean
  additionalActions?: (row: TData) => React.ReactNode
  renderTopToolbarCustomActions?: () => React.ReactNode
}

export function DataTable<TData extends Record<string, any>>({
  data,
  columns,
  isLoading = false,
  onView,
  onEdit,
  onDelete,
  enableRowActions = true,
  additionalActions,
  renderTopToolbarCustomActions,
}: DataTableProps<TData>) {
  const table = useMaterialReactTable({
    columns,
    data,
    localization: MRT_Localization_UK,
    enableRowActions: enableRowActions && !!(onView || onEdit || onDelete || additionalActions),
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        {onView && (
          <ViewIcon
            sx={{ cursor: 'pointer', color: 'primary.main' }}
            onClick={() => onView(row.original)}
          />
        )}
        {onEdit && (
          <EditIcon
            sx={{ cursor: 'pointer', color: 'primary.main' }}
            onClick={() => onEdit(row.original)}
          />
        )}
        {onDelete && (
          <DeleteIcon
            sx={{ cursor: 'pointer', color: 'error.main' }}
            onClick={() => onDelete(row.original)}
          />
        )}
        {additionalActions?.(row.original)}
      </Box>
    ),
    renderTopToolbarCustomActions,
    state: { isLoading },
    enableColumnFilters: true,
    enableSorting: true,
    enablePagination: true,
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      },
    },
  })

  return <MaterialReactTable table={table} />
}