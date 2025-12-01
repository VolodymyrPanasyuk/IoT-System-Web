import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Chip } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import type { MRT_ColumnDef } from 'material-react-table'
import { DataTable } from '@/components/common/DataTable/DataTable'
import { ConfirmDialog } from '@/components/common/ConfirmDialog/ConfirmDialog'
import { useCrud } from '@/hooks/useCrud'
import { groupsApiClient } from '@/api/identity/groups'
import type { Group } from '@/types/api/group'
import { formatDateTime } from '@/utils/dateUtils'

export const GroupsPage: React.FC = () => {
  const { items: groups, isLoading, fetchAll, remove } = useCrud(groupsApiClient, {
    entityName: 'Групу',
  })

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [groupToDelete, setGroupToDelete] = useState<Group | null>(null)

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const handleDelete = (group: Group) => {
    setGroupToDelete(group)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (groupToDelete) {
      const success = await remove(groupToDelete.id)
      if (success) {
        setIsDeleteDialogOpen(false)
        setGroupToDelete(null)
      }
    }
  }

  const columns: MRT_ColumnDef<Group>[] = [
    {
      accessorKey: 'name',
      header: 'Назва',
      size: 200,
    },
    {
      accessorKey: 'description',
      header: 'Опис',
      size: 300,
    },
    {
      accessorKey: 'roles',
      header: 'Ролі',
      size: 250,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {row.original.roles.map((role) => (
            <Chip key={role.roleId} label={role.roleName} size="small" color="primary" />
          ))}
        </Box>
      ),
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
        <Typography variant="h4">Групи</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Додати групу
        </Button>
      </Box>

      <DataTable data={groups} columns={columns} isLoading={isLoading} onDelete={handleDelete} />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        title="Видалити групу"
        message={`Ви впевнені, що хочете видалити групу "${groupToDelete?.name}"?`}
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false)
          setGroupToDelete(null)
        }}
      />
    </Box>
  )
}
