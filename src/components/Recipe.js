import React, { Component } from 'react'
import { connect } from 'react-redux'

import styled from '@emotion/styled/macro';
import { Container } from 'react-bootstrap';

import CheckoutModal from './CheckoutModal';

const Title = styled.h2`
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ItemsTitle = styled.h5`
  margin-bottom: 5px;
`;

const ItemContainer = styled.div`
  padding-top: 5px;
`;

const StyledContainer = styled(Container)`
  max-width: 90%;
`;

const StyledList = styled.div`
  
`;

const StyledListItem = styled.li`
  list-style-type: none;
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgb(224, 224, 224);
`;

{/*
Things to fix:
- add checkout modal

Things I've tried:
- added modal that pops up when checkout is clicked -> props not passed into modal & can't be closed
*/}

class Recipe extends Component {
    
    constructor(props) {
        super(props)
        this.shipping = React.createRef();
        this.shippingChecked = false;
        this.modalShow = false;
    }
    
    componentWillUnmount() {
        if (this.shippingChecked) {
            this.props.substractShipping();
        }
    }

    handleChecked = (e) => {
        if (e.target.checked) {
            this.props.addShipping();
            this.shippingChecked = true;
        }
        else {
            this.props.substractShipping();
            this.shippingChecked = false;
        }
    }

    // Checkout Functionality
    handleCheckout = () => {
        if (this.props.addedItems.length) {
            this.modalShow = true;
            this.shippingChecked = false;
            this.props.checkout();
            console.log("Checkout Successful!");
        }
        else {
            console.log("Checkout NOT Successful!");
        }
    }

    render() {
        return (
            <StyledContainer>
            <Title>Cart Breakdown</Title>
                <StyledList className="collection">
                    <StyledListItem className="collection-item">
                        <ItemsTitle><b><u>Item List: </u></b></ItemsTitle>
                        {this.props.addedItems.length ? 
                        (
                            <div>
                                {this.props.addedItems.map(item =>
                                    <ItemContainer key={item.id}>
                                        <b>{item.name}</b>
                                            <div>
                                            <span>({item.price}) x {item.inCart} = ${(item.price * item.inCart).toFixed(2)}</span>
                                            </div>
                                    </ItemContainer>
                                )}
                            </div>
                        ) : (
                            <span>none</span>
                        )}
                    </StyledListItem>
                    <StyledListItem className="collection-item">
                        <label>
                            <input type="checkbox" ref={this.shipping} onChange={this.handleChecked} />
                            <span>Shipping (+4)</span>
                        </label>
                    </StyledListItem>
                    <StyledListItem className="collection-item">
                        <b>Total: ${Math.abs(this.props.total.toFixed(2))}</b>
                    </StyledListItem>
                </StyledList>
                {/*<CheckoutModal 
                    items={this.props.addedItems}
                    show={this.modalShow}
                />*/}
                <div className="checkout">
                    <button className="waves-effect waves-light btn" onClick={()=>{this.handleCheckout()}}>Checkout</button>
                </div>
            </StyledContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        addShipping: () => {dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: () => {dispatch({type: 'SUB_SHIPPING'})},
        checkout: () => {dispatch({type: 'CHECKOUT'})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)