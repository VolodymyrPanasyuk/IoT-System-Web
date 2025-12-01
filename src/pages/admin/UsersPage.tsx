import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Chip } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import type { MRT_ColumnDef } from 'material-react-table'
import { DataTable } from '@/components/common/DataTable/DataTable'
import { ConfirmDialog } from '@/components/common/ConfirmDialog/ConfirmDialog'
import { UserFormDialog } from '@/components/forms/UserForm/UserFormDialog'
import { useCrud } from '@/hooks/useCrud'
import { usePermissions } from '@/hooks/usePermissions'
import { usersApiClient } from '@/api/identity/users'
import type { User } from '@/types/api/user'
import { formatDateTime } from '@/utils/dateUtils'

export const UsersPage: React.FC = () => {
  const { items: users, isLoading, fetchAll, remove } = useCrud(usersApiClient, {
    entityName: 'Користувача',
  })
  const { canManageTargetUser } = usePermissions()

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const handleCreate = () => {
    setSelectedUser(null)
    setIsFormOpen(true)
  }

  const handleEdit = (user: User) => {
    if (!canManageTargetUser(user)) {
      return
    }
    setSelectedUser(user)
    setIsFormOpen(true)
  }

  const handleDelete = (user: User) => {
    if (!canManageTargetUser(user)) {
      return
    }
    setUserToDelete(user)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (userToDelete) {
      const success = await remove(userToDelete.id)
      if (success) {
        setIsDeleteDialogOpen(false)
        setUserToDelete(null)
      }
    }
  }

  const handleFormClose = (shouldRefresh?: boolean) => {
    setIsFormOpen(false)
    setSelectedUser(null)
    if (shouldRefresh) {
      fetchAll()
    }
  }

  const columns: MRT_ColumnDef<User>[] = [
    {
      accessorKey: 'userName',
      header: "Ім'я користувача",
      size: 150,
    },
    {
      accessorKey: 'firstName',
      header: "Ім'я",
      size: 120,
    },
    {
      accessorKey: 'lastName',
      header: 'Прізвище',
      size: 120,
    },
    {
      accessorKey: 'roles',
      header: 'Ролі',
      size: 200,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {row.original.roles.map((role) => (
            <Chip key={role.roleId} label={role.roleName} size="small" color="primary" />
          ))}
        </Box>
      ),
    },
    {
      accessorKey: 'groups',
      header: 'Групи',
      size: 200,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {row.original.groups.map((group) => (
            <Chip key={group.groupId} label={group.groupName} size="small" color="secondary" />
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
        <Typography variant="h4">Користувачі</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Додати користувача
        </Button>
      </Box>

      <DataTable
        data={users}
        columns={columns}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UserFormDialog
        open={isFormOpen}
        user={selectedUser}
        onClose={handleFormClose}
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        title="Видалити користувача"
        message={`Ви впевнені, що хочете видалити користувача "${userToDelete?.userName}"? Цю дію не можна скасувати.`}
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false)
          setUserToDelete(null)
        }}
      />
    </Box>
  )
}
