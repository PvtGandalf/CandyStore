import { createStore } from 'redux';

import cartReducer from '../reducers/cartReducer';

const store = createStore(cartReducer);

store.subscribe(() => {
  console.log(store.getState())
});

export default store;