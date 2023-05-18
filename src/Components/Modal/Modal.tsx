import React, { ReactNode } from 'react';
import * as Styled from './styles';

type Props = {
  handleToggleDetailsModal: () => void;
  children: ReactNode;
};

const Modal = ({ handleToggleDetailsModal, children }: Props) => {
  const handleCloseModal = (e: React.MouseEvent) => {
    const modalEl = document.getElementById('modal');
    const closeIcon = document.getElementById('close-icon');
    if (modalEl === e.target || closeIcon === e.target) {
      handleToggleDetailsModal();
    }
  };

  return (
    <Styled.Modal
      initial={{ translateY: 10, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1, transition: { duration: 0.2 } }}
      exit={{ translateY: 10, opacity: 0, transition: { duration: 0.2 } }}
      id="modal"
      onClick={handleCloseModal}
    >
      <Styled.Container direction="column" justify="flex-start">
        <Styled.CloseIcon id="close-icon" />
        {children}
      </Styled.Container>
    </Styled.Modal>
  );
};

export default Modal;
