import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Chip } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import type { MRT_ColumnDef } from 'material-react-table'
import { DataTable } from '@/components/common/DataTable/DataTable'
import { ConfirmDialog } from '@/components/common/ConfirmDialog/ConfirmDialog'
import { RoleFormDialog } from '@/components/forms/RoleForm/RoleFormDialog'
import { useCrud } from '@/hooks/useCrud'
import { usePermissions } from '@/hooks/usePermissions'
import { rolesApiClient } from '@/api/identity/roles'
import type { Role } from '@/types/api/role'
import { formatDateTime } from '@/utils/dateUtils'
import { isSystemRole } from '@/utils/permissions'

export const RolesPage: React.FC = () => {
  const { items: roles, isLoading, fetchAll, remove } = useCrud(rolesApiClient, {
    entityName: 'Роль',
  })
  const { canManageTargetRole } = usePermissions()

  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null)

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const handleCreate = () => {
    setSelectedRole(null)
    setIsFormOpen(true)
  }

  const handleEdit = (role: Role) => {
    if (!canManageTargetRole(role)) {
      return
    }
    setSelectedRole(role)
    setIsFormOpen(true)
  }

  const handleDelete = (role: Role) => {
    if (!canManageTargetRole(role) || isSystemRole(role.name)) {
      return
    }
    setRoleToDelete(role)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (roleToDelete) {
      const success = await remove(roleToDelete.id)
      if (success) {
        setIsDeleteDialogOpen(false)
        setRoleToDelete(null)
      }
    }
  }

  const handleFormClose = (shouldRefresh?: boolean) => {
    setIsFormOpen(false)
    setSelectedRole(null)
    if (shouldRefresh) {
      fetchAll()
    }
  }

  const columns: MRT_ColumnDef<Role>[] = [
    {
      accessorKey: 'name',
      header: 'Назва',
      size: 200,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {row.original.name}
          {isSystemRole(row.original.name) && (
            <Chip label="Системна" size="small" color="info" />
          )}
        </Box>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Опис',
      size: 300,
    },
    {
      accessorKey: 'priority',
      header: 'Пріоритет',
      size: 100,
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
        <Typography variant="h4">Ролі</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Додати роль
        </Button>
      </Box>

      <DataTable
        data={roles}
        columns={columns}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={(role) => !isSystemRole(role.name) && handleDelete(role)}
      />

      <RoleFormDialog open={isFormOpen} role={selectedRole} onClose={handleFormClose} />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        title="Видалити роль"
        message={`Ви впевнені, що хочете видалити роль "${roleToDelete?.name}"? Цю дію не можна скасувати.`}
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false)
          setRoleToDelete(null)
        }}
      />
    </Box>
  )
}
