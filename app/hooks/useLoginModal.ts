import { create } from "zustand";

interface LoginModalStrore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModal = create<LoginModalStrore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
