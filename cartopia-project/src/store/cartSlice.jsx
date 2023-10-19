import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
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
        // console.log(action.payload)
        for (const item of action.payload.cart_items) {
          // console.log(item)
          // console.log(state.items.ProductId)
          const val = {
            ProductId: item.product_id,
            ProductName: item.product_name,
            quantity: item.quantity,
            ProductPrice: item.price_per_unit,
            total_price: item.price_per_unit * item.quantity,
            image: item.image,
          };
          state.items.push(val);
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
        state.totalPrice = state.totalPrice + newItem.total_price;
        state.totalQuantity++;

        if (!existingItem) {
          state.items.push(newItem);
        } else {
          existingItem.quantity++;
          existingItem.total_price =
            existingItem.total_price + newItem.total_price;
        }
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        // console.log(action.payload)
        const ProductId = action.payload.ProductId;
        // console.log(ProductId, "PRODUCTTTT")
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
        // console.log(val)
        for (const item of state.items) {
          if (item.ProductId === val.ProductId) {
            if (item.quantity > val.quantity) {
              item.quantity--;
              item.totalPrice -= item.ProductPrice;
              state.totalPrice -= item.ProductPrice;
              state.totalQuantity--;
            } else {
              item.quantity++;
              item.totalPrice += item.ProductPrice;
              state.totalPrice += item.ProductPrice;
              state.totalQuantity++;
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

    // console.log(res, "FETCHED CART")
    const values = res.data;
    // const values = {
    //     cartitems: res.data.cart_items,
    //     totalprice: res.data.total_price,
    //     totalquantity: res.data.total_quantity
    // }
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
      // console.log(res, "ress")
      // console.log(res.data, "RES DATA")
      const val = res.data.items;
      console.log(val, "ADDTOCART");
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
      // console.log(res)
      // Check the response for success or other relevant data
      if (res.status === 200) {
        // console.log("vewfdcs")
        const val = res.data.item;
        // console.log(val, "VAL")
        return val;
      } else {
        throw new Error("Failed to remove item from cart");
      }
    } catch (err) {
      console.error(err);
      throw err; // Re-throw the error so it can be caught by the `.catch` block when dispatched
    }
  }
);

export const updateItemOfCart = createAsyncThunk(
  "cart/updateItemOfCart",
  async (item) => {
    try {
      await updateCart(item);
      console.log(item);

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

// export const fetchProducts = createAsyncThunk("products/fetchProducts", async() => {
//   try {
//     const res = await getProduct();
//     const data = res.data.products
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// })
