import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Box,
  IconButton,
} from '@mui/material'
import {
  Home as HomeIcon,
  Devices as DevicesIcon,
  AdminPanelSettings as AdminIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
  GroupWork as GroupWorkIcon,
  ExpandLess,
  ExpandMore,
  ChevronLeft as ChevronLeftIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material'
import { useAuth } from '@/contexts/AuthContext'
import { useUIStore } from '@/store/uiStore'
import { APP_ROUTES } from '@/utils/constants'

interface NavItem {
  label: string
  path?: string
  icon: React.ReactNode
  requiresAuth?: boolean
  children?: NavItem[]
}

const navigationItems: NavItem[] = [
  {
    label: 'Головна',
    path: APP_ROUTES.HOME,
    icon: <HomeIcon />,
  },
  {
    label: 'Пристрої',
    path: APP_ROUTES.DEVICES,
    icon: <DevicesIcon />,
  },
  {
    label: 'Адміністрування',
    icon: <AdminIcon />,
    requiresAuth: true,
    children: [
      {
        label: 'Користувачі',
        path: APP_ROUTES.ADMIN.USERS,
        icon: <PeopleIcon />,
      },
      {
        label: 'Ролі',
        path: APP_ROUTES.ADMIN.ROLES,
        icon: <SecurityIcon />,
      },
      {
        label: 'Групи',
        path: APP_ROUTES.ADMIN.GROUPS,
        icon: <GroupWorkIcon />,
      },
    ],
  },
]

const authItems: NavItem[] = [
  {
    label: 'Вхід',
    path: APP_ROUTES.LOGIN,
    icon: <LoginIcon />,
  },
  {
    label: 'Реєстрація',
    path: APP_ROUTES.REGISTER,
    icon: <PersonAddIcon />,
  },
]

interface NavigationProps {
  drawerWidth: number
}

export const Navigation: React.FC<NavigationProps> = ({ drawerWidth }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore()
  const [openItems, setOpenItems] = React.useState<string[]>([])

  const handleToggle = (label: string) => {
    setOpenItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  const handleNavigate = (path: string) => {
    navigate(path)
    setMobileMenuOpen(false)
  }

  const renderNavItem = (item: NavItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isOpen = openItems.includes(item.label)
    const isActive = item.path ? location.pathname === item.path : false

    if (item.requiresAuth && !isAuthenticated) {
      return null
    }

    return (
      <React.Fragment key={item.label}>
        <ListItem disablePadding>
          <ListItemButton
            selected={isActive}
            onClick={() => {
              if (hasChildren) {
                handleToggle(item.label)
              } else if (item.path) {
                handleNavigate(item.path)
              }
            }}
            sx={{ pl: 2 + depth * 2 }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
            {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map((child) => renderNavItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    )
  }

  const drawer = (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <img src="/logo.svg" alt="Logo" style={{ height: 32 }} />
        <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ display: { md: 'none' } }}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>{navigationItems.map((item) => renderNavItem(item))}</List>
      {!isAuthenticated && (
        <>
          <Divider />
          <List>{authItems.map((item) => renderNavItem(item))}</List>
        </>
      )}
    </Box>
  )

  return (
    <>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}
