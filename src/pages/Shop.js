import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from '../components/actions/cartActions'
import Header from '../components/Header';
import Footer from '../components/Footer';

import styled from '@emotion/styled/macro';
import { Container, Row, Col, Card, InputGroup, FormControl } from 'react-bootstrap';

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
  padding-bottom: 5px;
  font-weight: bold;
`;

const StyledCardText = styled(Card.Text)`
  
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

const StyledButton = styled.span`
  margin: 10px;
  transform: scale(0.9);
    &:hover {
    transform: scale(0.95);
  }
`;

const StyledFormControl = styled(FormControl)`
  text-align: center;
`;

const StyledInputGroup = styled(InputGroup)`
  width: 35%;
  align-items: center;
  align-self: end;
`;

{/*
Things to fix:
- let each item have their own purchase amount
- make the addToCart function accept a purchase amount (default = 1)

Things I've tried:
- create a state variable with a val property (ex. val[2]=5 -> purchase 5 of 2nd item )
- hardcode purchase amount into addToCart (count not being passed - returns undefined)
*/}

class Shop extends Component {
    
  state = {
    dict: {}
  }
  
  handleClick = (id) => {
    console.log("adding ", this.state.dict[id], "to", id, "nd item");
    this.props.addToCart(id, this.state.dict[id]);
  }
  
  handleChange = (id, quantity) => {
    this.state.dict[id] = quantity;
  }

  render() {
    return(
      <div>
        <Header></Header>
        <Title>Shop</Title>
        <StyledContainer>
          <Row className="row-cols-1 row-cols-md-4 g-4">
            {this.props.items.map(item =>
              <Col key={item.id}>
                <StyledCard>
                  <ImageContainer>
                    <StyledImage src={item.photoUrl}className="card-img-top"alt=""></StyledImage>
                  </ImageContainer>
                  <StyledCardBody>
                    <StyledCardTitle>{item.name}</StyledCardTitle>
                    <StyledCardText>In Stock: {item.inStock}</StyledCardText>
                    <StyledCardText>Price: ${item.price}</StyledCardText>
                  </StyledCardBody>
                  <StyledInputGroup>
                      <StyledFormControl
                        placeholder="0"
                        aria-label="quantity"
                        aria-describedby="basic-addon2"
                        value={this.state.dict[item.id]}
                        onChange={e => this.handleChange(item.id, e.target.value)}
                        
                      />
                    <StyledButton className="btn-floating waves-effect waves-light red" onClick={()=>{this.handleClick(item.id)}}>
                      <i className="material-icons">add</i>
                    </StyledButton>
                  </StyledInputGroup>
                </StyledCard>
              </Col>
            )}
          </Row>
        </StyledContainer>
        <Footer></Footer>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log("[SHOP] state: ", state)
  return {
    items: state.items
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)