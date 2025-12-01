import { create } from 'zustand'
import type { Device } from '@/types/api/device'

interface DevicesState {
  devices: Device[]
  selectedDevice: Device | null
}

interface DevicesActions {
  setDevices: (devices: Device[]) => void
  addDevice: (device: Device) => void
  updateDevice: (device: Device) => void
  removeDevice: (deviceId: string) => void
  setSelectedDevice: (device: Device | null) => void
  clearDevices: () => void
}

type DevicesStore = DevicesState & DevicesActions

export const useDevicesStore = create<DevicesStore>((set) => ({
  devices: [],
  selectedDevice: null,

  setDevices: (devices: Device[]) => set({ devices }),

  addDevice: (device: Device) =>
    set((state) => ({ devices: [...state.devices, device] })),

  updateDevice: (device: Device) =>
    set((state) => ({
      devices: state.devices.map((d) => (d.id === device.id ? device : d)),
      selectedDevice:
        state.selectedDevice?.id === device.id ? device : state.selectedDevice,
    })),

  removeDevice: (deviceId: string) =>
    set((state) => ({
      devices: state.devices.filter((d) => d.id !== deviceId),
      selectedDevice:
        state.selectedDevice?.id === deviceId ? null : state.selectedDevice,
    })),

  setSelectedDevice: (device: Device | null) => set({ selectedDevice: device }),

  clearDevices: () => set({ devices: [], selectedDevice: null }),
}))
