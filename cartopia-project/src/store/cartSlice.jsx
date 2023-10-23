import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import {
  addCart,
  getCart,
  removeAllCart,
  removeFromCart,
  updateCart,
} from "../api/apiHandler";

const initialCartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

let setPrice = 0;

const CartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.rejected, (state, action) => {
        state.items = [];
        state.totalPrice = 0;
        state.totalQuantity = 0;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        for (const item of action.payload.cart_items) {
          const val = {
            ProductId: item.product_id,
            ProductName: item.product_name,
            quantity: item.quantity,
            ProductPrice: item.price_per_unit,
            total_price: item.price_per_unit * item.quantity,
            image: item.image,
          };
          state.items.push(val);
          console.log(item);
        }
        state.totalPrice = action.payload.total_price;
        state.totalQuantity = action.payload.total_quantity;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        // console.log(action.payload)
        const newItem = action.payload;
        // console.log(newItem, "NEWITEM")
        const existingItem = state.items.find(
          (item) => item.ProductId === newItem.ProductId
        );

        setPrice += newItem.total_price;
        state.totalPrice = setPrice;
        console.log(state.totalPrice);
        state.totalQuantity++;

        if (!existingItem) {
          state.items.push(newItem);
        } else {
          existingItem.quantity++;
          existingItem.totalPrice =
            existingItem.total_price + newItem.total_price;
        }
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        const ProductId = action.payload.ProductId;
        const existingItem = state.items.find(
          (item) => item.ProductId === ProductId
        );
        state.totalPrice = state.totalPrice - existingItem.total_price;
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
        state.items = state.items.filter(
          (item) => item.ProductId !== ProductId
        );
      })

      .addCase(updateItemOfCart.fulfilled, (state, action) => {
        const val = action.payload;
        for (const item of state.items) {
          if (current(item).ProductId === val.ProductId) {
            if (current(item).quantity > val.quantity) {
              item.quantity--;
              item.totalPrice = item.total_price * item.quantity;
              console.log(item.totalPrice);
            } else {
              item.quantity++;
              item.totalPrice = item.total_price * item.quantity;
              console.log(item.totalPrice);
            }
          }
        }
      })

      .addCase(removeAllItemsFromCart.fulfilled, (state, action) => {
        state.items = [];
        state.totalPrice = 0;
        state.totalQuantity = 0;
      });
  },
});
export default CartSlice.reducer;

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  try {
    const res = await getCart();
    const values = res.data;
    return values;
  } catch (err) {
    console.error(err);
    throw err;
  }
});

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (item) => {
    try {
      // console.log(item)
      const res = await addCart(item);
      console.log(res);
      const val = res.data.items;
      return val;
    } catch (err) {
      throw new Error("Failed to add item to cart");
    }
  }
);
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (ProductId) => {
    try {
      const res = await removeFromCart(ProductId);
      if (res.status === 200) {
        const val = res.data.item;
        return val;
      } else {
        throw new Error("Failed to remove item from cart");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const updateItemOfCart = createAsyncThunk(
  "cart/updateItemOfCart",
  async (item) => {
    try {
      await updateCart(item);
      return item;
    } catch (err) {
      console.log(err);
    }
  }
);

export const removeAllItemsFromCart = createAsyncThunk(
  "cart/removeAllItemsFromCart",
  async () => {
    try {
      const res = await removeAllCart();
      return res;
    } catch (err) {
      console.log(err);
    }
  }
);
