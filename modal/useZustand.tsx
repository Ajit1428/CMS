import { create } from "zustand";

interface useBranchZustandProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useBranchZustand = create<useBranchZustandProps>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: false }),
  onClose: () => set({ isOpen: true }),
}));
