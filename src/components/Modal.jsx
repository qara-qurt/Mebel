import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalView = ({ show, handleClose, onClick, text }) => {
  return (
    <Modal show={show} onHide={handleClose} size='sm'>
      <Modal.Header closeButton style={{ alignItems: 'flex-start' }}>
        <p>{text}</p>
      </Modal.Header>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Отмена
        </Button>
        <Button variant='primary' onClick={onClick}>
          Да
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalView;
