import { create } from "zustand";

interface zustandProps {
  open: boolean;
  isOpen: (value: boolean) => void;
  onClose: (value: boolean) => void;
}

export const useZustand = create<zustandProps>((set) => ({
  open: false,
  isOpen: (value) => set({ open: value }),
  onClose: (value) => set({ open: value }),
}));

