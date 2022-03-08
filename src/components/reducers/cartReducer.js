import * as products from '../../data/products.json'

import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING } from '../actions/action-types/cart-actions'

const initState = {
    
    items: Object.values(products).slice(0, (Object.values(products).length - 2) ),
    addedItems: [],
    total: 0

}

const cartReducer = ( state = initState, action ) => {
   
    // Add item to cart [Used in shop component]
    if (action.type === ADD_TO_CART) {
        
        // Find the item to be added
        let addedItem = state.items.find(item => item.id === action.id)
        
        let quantity = action.count
        console.log("quantity", action.count)
        
        // Check if the added item already exists in the list of added items
        let existed_item = state.addedItems.find(item => action.id === item.id)
        console.log("item added to cart: ", addedItem.name)
        
        // Check if item already added and is in stock
        if (existed_item && (addedItem.inStock > 0)) {
            
            // Update item inCart and inStock count
            addedItem.inCart += 1;
            addedItem.inStock -= 1;
            
            // Return old state with updated total
            return {
                ...state,
                total: state.total + addedItem.price
            }
        }
        
        // Check if item is in stock
        else if (addedItem.inStock > 0) {
            
            // Update item inCart and inStock count
            addedItem.inCart = 1;
            addedItem.inStock -= 1;
            
            // Update total cost
            let newTotal = state.total + addedItem.price 
            
            // Return old state with new items added and new total
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
        
        // Else return old state
        else {
            return {
                ...state,
                total : state.total
            }
        }
    }
    
    // Remove item from cart [Used in shop component]
    if (action.type === REMOVE_ITEM) {
        
        // Find the item to be removed
        let itemToRemove = state.addedItems.find(item => action.id === item.id)
        
        // Increment amount in stock
        itemToRemove.inStock += 1;
        
        // Update items list to exclude the item to be removed
        let new_items = state.addedItems.filter(item => action.id !== item.id)
        
        // Calculate new total cost
        let newTotal = state.total - ( itemToRemove.price * itemToRemove.inCart )
        console.log("item removed from cart: ", itemToRemove.name)
        
        // Return updated state with new items list and new total cost
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    
    // Add more of an item to cart [Used in cart component]
    if (action.type === ADD_QUANTITY) {
        
        // Find the item to be added
        let addedItem = state.items.find(item => item.id === action.id)
        
        // Initialize the new total based on current total
        let newTotal = state.total
        
        // Update new total only if the addedItem exists and is in stock
        if (addedItem && (addedItem.inStock > 0)) {
            addedItem.inCart += 1;
            addedItem.inStock -= 1;
            newTotal = state.total + addedItem.price
        }
        
        // Return state with updated total
        return {
            ...state,
            total: newTotal
        }
    }
    
    // Remove an item from the cart [Used in cart component]
    if (action.type === SUB_QUANTITY) {  
        
        // Find the item to be altered
        let addedItem = state.items.find(item => item.id === action.id) 
        
        // Check if there is only 1 item left
        if (addedItem.inCart === 1){
            
            // Increment in stock amount
            addedItem.inStock += 1;
            
            // Update items list to exclude the item to be removed
            let new_items = state.addedItems.filter(item => item.id !== action.id)
            
            // Calculate new total cost
            let newTotal = state.total - addedItem.price
            
            // Return updated state with new items list and new total cost
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        } 
        
        // If there is more than 1 of the item in the cart
        else {
            addedItem.inCart -= 1
            addedItem.inStock += 1;
            let newTotal = state.total - addedItem.price
            
            // Return state with updated total
            return {
                ...state,
                total: newTotal
            }
        }
        
    }

    // Add shipping [Used in recipe component]
    if (action.type === ADD_SHIPPING){
        return {
            ...state,
            total: state.total + 4
        }
    }
    
    // Remove shipping [Used in recipe component]
    if (action.type === 'CHECKOUT') {
        return {
            ...state,
            addedItems: [],
            total: 0
        }
    }
    
  else { return state }
    
}

export default cartReducer
