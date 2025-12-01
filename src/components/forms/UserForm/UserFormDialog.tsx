import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  OutlinedInput,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usersApiClient } from '@/api/identity/users'
import { rolesApiClient } from '@/api/identity/roles'
import { groupsApiClient } from '@/api/identity/groups'
import type { User, CreateUserRequest, UpdateUserRequest } from '@/types/api/user'
import type { Role } from '@/types/api/role'
import type { Group } from '@/types/api/group'
import { createUserSchema, updateUserSchema } from '@/utils/validators'
import { useNotification } from '@/contexts/NotificationContext'
import { getErrorMessage } from '@/utils/helpers'

interface UserFormDialogProps {
  open: boolean
  user: User | null
  onClose: (shouldRefresh?: boolean) => void
}

export const UserFormDialog: React.FC<UserFormDialogProps> = ({ open, user, onClose }) => {
  const isEdit = !!user
  const { showSuccess, showError } = useNotification()
  const [roles, setRoles] = useState<Role[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateUserRequest | UpdateUserRequest>({
    resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema),
  })

  useEffect(() => {
    if (open) {
      fetchRolesAndGroups()
    }
  }, [open])

  useEffect(() => {
    if (user && isEdit) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        roleIds: user.roles.map((r) => r.roleId),
        groupIds: user.groups.map((g) => g.groupId),
      })
    } else {
      reset({
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        roleIds: [],
        groupIds: [],
      })
    }
  }, [user, isEdit, reset])

  const fetchRolesAndGroups = async () => {
    try {
      const [rolesData, groupsData] = await Promise.all([
        rolesApiClient.getAll(),
        groupsApiClient.getAll(),
      ])
      setRoles(rolesData)
      setGroups(groupsData)
    } catch (error) {
      showError(getErrorMessage(error))
    }
  }

  const onSubmit = async (data: CreateUserRequest | UpdateUserRequest) => {
    try {
      setIsSubmitting(true)
      if (isEdit && user) {
        await usersApiClient.update(user.id, data as UpdateUserRequest)
        showSuccess('Користувача оновлено')
      } else {
        await usersApiClient.create(data as CreateUserRequest)
        showSuccess('Користувача створено')
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
      <DialogTitle>{isEdit ? 'Редагувати користувача' : 'Створити користувача'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            {!isEdit && (
              <>
                <Grid item xs={12}>
                  <TextField
                    {...register('userName')}
                    label="Ім'я користувача"
                    fullWidth
                    error={!isEdit && 'userName' in errors && !!errors.userName}
                    helperText={!isEdit && 'userName' in errors ? errors.userName?.message : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('password')}
                    label="Пароль"
                    type="password"
                    fullWidth
                    error={!isEdit && 'password' in errors && !!errors.password}
                    helperText={!isEdit && 'password' in errors ? errors.password?.message : ''}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12} sm={6}>
              <TextField
                {...register('firstName')}
                label="Ім'я"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                {...register('lastName')}
                label="Прізвище"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="roleIds"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Ролі</InputLabel>
                    <Select
                      {...field}
                      multiple
                      input={<OutlinedInput label="Ролі" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {(selected as string[]).map((value) => {
                            const role = roles.find((r) => r.id === value)
                            return <Chip key={value} label={role?.name} size="small" />
                          })}
                        </Box>
                      )}
                    >
                      {roles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="groupIds"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Групи</InputLabel>
                    <Select
                      {...field}
                      multiple
                      input={<OutlinedInput label="Групи" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {(selected as string[]).map((value) => {
                            const group = groups.find((g) => g.id === value)
                            return <Chip key={value} label={group?.name} size="small" />
                          })}
                        </Box>
                      )}
                    >
                      {groups.map((group) => (
                        <MenuItem key={group.id} value={group.id}>
                          {group.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
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