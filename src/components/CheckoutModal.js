import { Modal, Button } from 'react-bootstrap';
import styled from '@emotion/styled/macro';

const ItemContainer = styled.div`
  padding-top: 5px;
`;

export default function CheckoutModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Checkout Successful!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Purchased Items</h4>
        {console.log("props.items", props.items)}
        {props.items.map(item =>
          <ItemContainer key={item.id}>
            <b>{item.name}</b>
            <div>
              <span>({item.price}) x {item.inCart} = ${(item.price * item.inCart).toFixed(2)}</span>
            </div>
          </ItemContainer>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}