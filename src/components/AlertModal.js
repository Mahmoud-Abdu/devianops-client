import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function AlertModal({ item, handleClose, handleDelete }) {
  useEffect(() => {}, []);

  const onDelete = async () => {
    handleDelete();
    handleClose();
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title> Delete {item} ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this {item}? </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onDelete}>
          Save Changes
        </Button>
      </Modal.Footer>
    </>
  );
}

export default AlertModal;
