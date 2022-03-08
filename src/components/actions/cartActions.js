
import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING, SUB_SHIPPING, CHECKOUT } from './action-types/cart-actions'

//add cart action
export const addToCart = (id, count) => {
    console.log("count: ", count)
    return {
        type: ADD_TO_CART,
        id,
        count
    }
}

//remove item action
export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        id
    }
}

//subtract quantity action
export const subtractQuantity = (id) => {
    return {
        type: SUB_QUANTITY,
        id
    }
}

//add quantity action
export const addQuantity = (id) => {
    return {
        type: ADD_QUANTITY,
        id
    }
}

//add shipping action
export const addShipping = (id) => {
    return {
        type: ADD_SHIPPING,
        id
    }
}

//subtract shipping action
export const subtractShipping = (id) => {
    return {
        type: SUB_SHIPPING,
        id
    }
}

//checkout
export const checkout = () => {
    return {
        type: CHECKOUT
    }
}