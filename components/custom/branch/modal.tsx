"use client";

interface ModalProps {
  title: string,
  description: string,
  isOpen: boolean,
  onClose: () => void,
  children?: React.ReactNode
}

export const BranchModal = ({
 title,
 description,
 isOpen,
 onClose,
 children 
}: ModalProps) => {
  const onChange = (open: boolean) => {
    if(!open){
      onClose();
    }
  }
  return (<div></div>) ;
};

