import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

function ClickModal({ modalEnabled, handleClose }) {

  useEffect(() => {
    // Update the document title using the browser API
    console.log(`You triggered the modal enabling`);
  }, [enabled]);



  return (
    <>
      <Modal show={modalEnabled} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Task will be updated</Modal.Title>
        </Modal.Header>
        <Modal.Body>We will update this task in the database.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ClickModal;
