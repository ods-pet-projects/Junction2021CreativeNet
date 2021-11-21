import Modal from 'react-bootstrap/Modal'
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import ReactTooltip from 'react-tooltip';


function IntroModal() {
    const [show, setShow] = useState(false);
    const [cursor, setCursor] = useState(0);
  
    const handleClose = () => { setShow(false); setCursor(0); } 
    const handleShow = () => setShow(true);

    const introSlides = [
        ['The Challenge: CGI & KONE', <div><p>KONE operates elevators & escalators that serve over 1 billion people worldwide.</p><p>Their elevators are smart - they send data back. KONE's algorithms then process the data and provide gazillions of service action recommendations for technicians to repair.</p>
        <p>The problem is: <b>how to select the useful repair recommendations</b>, i.e. the ones that are most likely to require a visit? That's where our solution comes in…</p></div>],
        ['The Solution', <div><ReactTooltip /><p>We used KONE's dataset of over 100,000 real service action recommendations and their outcomes.</p><p>We wrote an ML-model (using <b>catboost</b>, our model is available on <a href="https://github.com/ods-pet-projects/Junction2021CreativeNet/tree/master/frontend">GitHub</a>) that takes into account <span data-tip="Criteria such as sensor quality or equipment load category for the equipment involved in the production of the recommendation." style={{borderBottom: "1px dashed #000000"}}>various criteria</span> from past recommendations and provides a score (<b>POSITIVE FEEDBACK</b>) for how likely a given recommendation is to be useful.</p> <p>We tested our model on test data, achieving 97.7% accuracy!</p><p>And then we mapped the data!</p></div>],
        ['How Our Demo Works?', <div><p>This page serves to demonstrate our solution. It has the following:</p>
        <ul style={{listStyleType: "none!important"}}>
          <li style={{listStyleType: "none!important"}}>
          ⚬ <b>map-based repsentation of recommendation assessments</b> - we have plotted an example map of one city (Tokyo) with incoming sensor calls over the period of two days with recommendations assessed by our algorithm. This could be extended to any city where KONE operates, providing an easy tool for grouping and navigating the estimations.<br />
            </li>
            <li style={{listStyleType: "none!important"}}>
            ⚬ <b>table-based representation of recommendation assessments</b> - we provide a table with recommendations assessed (see the POSITIVE FEEDBACK field). Technicians can navigate this table, review repair tasks, and accept or discard them based on our recommendations.
            </li>
            <li style={{listStyleType: "none!important"}}>
            ⚬ <b>details pages explaining our recommendation assessments individually</b> - you can click "Get details" on any of the table rows and reach a page with a more detailed explanation of how our assessment was reached.
            </li>    
            </ul><p>We hope this can make repairs much more efficient, saving resources and increasing the safety and well-being of a subset of the 1 billion people using KONE elevators!</p></div>],
    ]
  
    return (
      <>
        <Button variant="success" onClick={handleShow} style={{marginTop: "2rem"}}>
          Click for an explanation of the challenge and solution
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{cursor+1} / {introSlides.length}: {introSlides[cursor][0]}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{introSlides[cursor][1]}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            { cursor < introSlides.length-1 ? 
            (<Button variant="primary" onClick={() => setCursor((c) => c+1)}>
              Read next…
            </Button>) : ''}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default IntroModal;