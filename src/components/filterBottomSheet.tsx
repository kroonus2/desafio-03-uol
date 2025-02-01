import { Sheet } from "react-modal-sheet";
import React from "react";

// Definir interface para as props
interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
// Lib react-model-sheet
// [0, 0.5, 0.75, 1]
// [1, 0.75 , 0.5 , 0]

const MyBottomSheet = ({ open, onClose, children }: BottomSheetProps) => {
  return (
    <Sheet isOpen={open} onClose={onClose} snapPoints={[500, 300, 100, 0]}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content className="p-4">{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop className="bg-black/50" onTap={onClose} />
    </Sheet>
  );
};

export default MyBottomSheet;
