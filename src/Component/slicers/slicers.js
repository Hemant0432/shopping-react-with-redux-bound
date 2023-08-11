import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartCount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.cartItems.push(action.payload);
            state.cartCount = state.cartItems.length;
        },
        removeCart(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (itemIndex !== -1) {
                state.cartItems.splice(itemIndex, 1);
                state.cartCount = state.cartItems.length;
            }
        }
    }
});


export const { addToCart,removeCart } = cartSlice.actions;
export default cartSlice.reducer;