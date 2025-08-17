import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lovedProduct: [],
  viewProducts: "grid",
  token: localStorage.getItem("token") || null,
  user_info: null,
  user_address:[],
  shopping_cart:[],
  categories: [],
  searchValue:''
};

export const ecommerceSlice = createSlice({
  name: "ecommerce",
  initialState,
  reducers: {

   manageViewProducts: (state, action) => {
      state.viewProducts = action.payload;
    },

    // products list
    addList: (state, action) => {
      state.lovedProduct.push({ ...action?.payload, list: true });
    },
    removeList: (state, action) => {
      state.lovedProduct = state.lovedProduct.filter(
        (prod) => prod._id !== action?.payload
      );
    },
    login_user: (state, action) => {
      state.token = action.payload;
    },
    user_info: (state, action) => {
      state.user_info = action.payload;
    },
    logout_user: (state) => {
      state.token = null;
      state.user_info = null;
      state.user_address = null;
      state.shopping_cart = null;
    },
    user_address: (state, action) => {
      state.user_address = action.payload;
    },
    shopping_cart: (state, action) => {
      state.shopping_cart = action.payload;
    },
    categories: (state, action) => {
      state.categories = action.payload;
    },
    searchValue: (state, action) => {
      state.searchValue = action.payload
    }

  },
});

export const {
  manageViewProducts,
  addList,
  removeList,
  login_user,
  logout_user,
  user_info,
  user_address,
  shopping_cart,
  categories,
  searchValue,
} = ecommerceSlice.actions;

export default ecommerceSlice.reducer;
