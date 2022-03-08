import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem, addQuantity, subtractQuantity } from '../components/actions/cartActions'
import Recipe from '../components/Recipe'

import Header from '../components/Header';
import Footer from '../components/Footer';

import styled from '@emotion/styled/macro';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Title = styled.h1`
  text-align: center;
  padding-top: 20px;
  padding-bottom: 10px;
`;

const StyledContainer = styled(Container)`
  max-width: 95%;
`;

const StyledCard = styled(Card)`
  min-height: 400px;
`;

const StyledCardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledCardTitle = styled(Card.Title)`
  text-align: center;
  margin-top: -20px;
  padding-bottom: 20px;
  font-weight: bold;
`;

const StyledCardText = styled(Card.Text)`
  text-align: center;
`;

const ImageContainer = styled.div`
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const StyledImage = styled.img`
  max-width:200px;
  max-height:200px;
`;

const AddRemove = styled.div`
  text-align: center;
`;

const FooterContainer = styled.div`
  width: 100%;
  margin-top: 25px;
  bottom: 0;
`;

const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

class Cart extends Component {

    //to remove the item completely
    handleRemove = (id) => {
        this.props.removeItem(id);
    }
    //to add the inCart
    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
        this.forceUpdate();
    }
    //to substruct from the inCart
    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
        this.forceUpdate();
    }
    render() {
        return(
            <div>
            <PageContainer>
                <Header></Header>
                <Title>Your Cart</Title>
                    <StyledContainer>
                            {this.props.items.length ? 
                            ( 
                                <Row className="row-cols-1 row-cols-md-3 g-3">
                                    {this.props.items.map(item =>
                                        <Col key={item.id}>
                                            <StyledCard>
                                                <ImageContainer className="item-img"> 
                                                    <StyledImage src={item.photoUrl} alt={item.photoUrl} className=""/>
                                                </ImageContainer>
                                
                                                <StyledCardBody>
                                                    
                                                    <StyledCardTitle>
                                                        <b>{item.name}</b>
                                                    </StyledCardTitle>
                                                    <StyledCardText>
                                                        <b>Price: ${item.price}</b>
                                                    </StyledCardText> 
                                                    <StyledCardText>
                                                        <b>In Stock: {item.inStock}</b>
                                                    </StyledCardText>
                                                    <StyledCardText>
                                                        <b>Quantity: {item.inCart}</b>
                                                    </StyledCardText>
                                                    
                                                    <AddRemove className="add-remove">
                                                        <Link to="/cart">
                                                            <i className="material-icons" onClick={()=>{this.handleAddQuantity(item.id)}}>arrow_drop_up</i>
                                                        </Link>
                                                        <Link to="/cart">
                                                            <i className="material-icons" onClick={()=>{this.handleSubtractQuantity(item.id)}}>arrow_drop_down</i>
                                                        </Link>
                                                    </AddRemove>
                                                    <button className="waves-effect waves-light btn pink remove" onClick={()=>{this.handleRemove(item.id)}}>Remove</button>
                                                
                                                </StyledCardBody>
                                            </StyledCard>
                                        </Col>
                                    )}
                                </Row>
                            ) : (
                                <StyledCardBody>
                                    <StyledCardText>
                                        There are no items in your cart
                                    </StyledCardText>
                                </StyledCardBody>
                            )}
                    </StyledContainer> 
                    <Recipe />
                <FooterContainer>
                    <Footer></Footer>
                </FooterContainer>
                </PageContainer>
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    console.log("[Cart] items: ", state.items)
    console.log("[Cart] addedItems: ", state.addedItems)
    return {
        items: state.addedItems,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => {dispatch(removeItem(id))},
        addQuantity: (id) => {dispatch(addQuantity(id))},
        subtractQuantity: (id) => {dispatch(subtractQuantity(id))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)