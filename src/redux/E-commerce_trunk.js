// ecommerceThunks.js
import { serverUrl } from "../config/ServerUrl.js";
import {
  // cart_delete_loading,
  // decreaseQuantity,
  login_user,
  logout_user,
  shopping_cart,
  user_address,
  user_info,
} from "./EcommerceSlice.js";
import axios from "axios";
import { toast } from "react-hot-toast";

export const login = (token) => async (dispatch) => {
  try {
    localStorage.setItem("token", token);
    dispatch(login_user(token));

    const response = await axios.get(
      serverUrl + "/api/user/personal_details",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = response?.data;

    dispatch(user_info(data?.data));
    dispatch(user_address(data?.data?.address_details));
    // dispatch(shopping_cart(user_data?.data?.data?.shopping_cart));
    if (data.success) {
         try {
           const response = await axios.get(serverUrl + "/api/cart/get_cart", {
             headers: { Authorization: `Bearer ${token}` },
           });
           const data = response?.data;
           dispatch(shopping_cart(data?.carts));
         } catch (error) {
           toast.error(error?.response?.data?.message);
         }

    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(logout_user());
};

// export const decrementQuantity = (product) => async (dispatch, getState) => {
//   const products = getState().ecommerce?.cart_products;
//   const existingProduct = products.find(
//     (cart_prod) => cart_prod?._id == product?._id
//   );
// console.log(existingProduct?.quantity);
//   if (existingProduct?.quantity == 1) {
//     const token = getState().ecommerce?.token;
//     try {
//       dispatch(cart_delete_loading(true));
//       const response = await axios.post(
//         serverUrl + `/api/cart/delete_cart/${product?._id}`,
//         null,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const data = response?.data;
//       console.log(data);
//       if (data?.success) {
//         dispatch(decreaseQuantity(product?._id));
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//       console.log(error);
//     } finally {
//             dispatch(cart_delete_loading(false));

//     }
//   } else {
//     dispatch(decreaseQuantity(product?._id));
//   }
// };
