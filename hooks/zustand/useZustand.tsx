import {create} from "zustand"

interface zustandProps{
  open: boolean,
  isOpen: () => void,
  onClose: () => void
}

export const useZustand = create<zustandProps>((set) => ({
  open : true,
  isOpen : () => set({open: true}),
  onClose: () => set({open: false})
}))