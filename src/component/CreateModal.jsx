import React from 'react';
import { Modal, Button} from 'react-bootstrap';

const CreateModal = props => {

    return(
         <Modal show={props.showModal} onHide={() => props.closeModal()}>
            <Modal.Header closeButton>
              <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                   {props.content}  
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.closeModal}>
                Cancel
              </Button>
              <Button variant="primary"onClick={props.action}>
              {props.btnText}
              </Button>
            </Modal.Footer>
          </Modal>
        );
    };

export default CreateModal;