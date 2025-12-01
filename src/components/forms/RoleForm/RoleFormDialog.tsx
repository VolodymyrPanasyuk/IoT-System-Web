import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { rolesApiClient } from '@/api/identity/roles'
import type { Role, CreateRoleRequest, UpdateRoleRequest } from '@/types/api/role'
import { createRoleSchema } from '@/utils/validators'
import { useNotification } from '@/contexts/NotificationContext'
import { getErrorMessage } from '@/utils/helpers'
import { isSystemRole } from '@/utils/permissions'

interface RoleFormDialogProps {
  open: boolean
  role: Role | null
  onClose: (shouldRefresh?: boolean) => void
}

export const RoleFormDialog: React.FC<RoleFormDialogProps> = ({ open, role, onClose }) => {
  const isEdit = !!role
  const isSystem = role ? isSystemRole(role.name) : false
  const { showSuccess, showError } = useNotification()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRoleRequest>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: isEdit
      ? {
        name: role.name,
        description: role.description || '',
        priority: role.priority,
      }
      : {
        name: '',
        description: '',
        priority: 0,
      },
  })

  useEffect(() => {
    if (role && isEdit) {
      reset({
        name: role.name,
        description: role.description || '',
        priority: role.priority,
      })
    } else {
      reset({
        name: '',
        description: '',
        priority: 0,
      })
    }
  }, [role, isEdit, reset])

  const onSubmit = async (data: CreateRoleRequest) => {
    try {
      setIsSubmitting(true)
      if (isEdit && role) {
        const updateData: UpdateRoleRequest = {
          description: data.description,
          priority: data.priority,
        }
        // Системні ролі не можна перейменовувати
        if (!isSystem) {
          updateData.name = data.name
        }
        await rolesApiClient.update(role.id, updateData)
        showSuccess('Роль оновлено')
      } else {
        await rolesApiClient.create(data)
        showSuccess('Роль створено')
      }
      onClose(true)
    } catch (error) {
      showError(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? 'Редагувати роль' : 'Створити роль'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register('name')}
                label="Назва"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={isSystem}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('description')}
                label="Опис"
                fullWidth
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('priority', { valueAsNumber: true })}
                label="Пріоритет"
                type="number"
                fullWidth
                error={!!errors.priority}
                helperText={errors.priority?.message || 'Вищий пріоритет = більше число'}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()}>Скасувати</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Збереження...' : 'Зберегти'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
