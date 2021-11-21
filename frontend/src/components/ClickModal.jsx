import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function ClickModal({ enabled, handleClose }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Modal show={show || enabled} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task will be updated</Modal.Title>
        </Modal.Header>
        <Modal.Body>We will update this task in the database.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ClickModal;
