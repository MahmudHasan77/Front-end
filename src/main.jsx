import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import RootLayout from "./Components/Layout/RootLayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./Components/pages/About.jsx";
import Shop from "./Components/pages/shop/Shop";
import Contact from "./Components/pages/Contact";
import Cart from "./Components/pages/Cart.jsx";
import Signin from "./Components/pages/Signin.jsx";
import Products from "./Components/pages/Products.jsx";
import SingleProduct from "./Components/pages/SingleProduct.jsx";
import SignUp from "./Components/pages/SignUp.jsx";
import Personal from "./Components/pages/Personal.jsx";
import Electronics from "./Components/Electronics";
import CheckOut from "./Components/CheckOut.jsx";
import Profile from "./Components/Profile.jsx";
import EditProfile from "./Components/EditProfile.jsx";
import MyOrder from "./Components/MyOrder.jsx";
import ResetPassword from "./Components/ResetPassword.jsx";
import Verify_email_OTP from "./Components/Verify_email_OTP.jsx";
import Forgot_password_OTP from "./Components/Forgot_password_OTP.jsx";
import SingleBlog from "./Components/SingleBlog.jsx";
import Add_address from "./Components/Add_address.jsx";
import Add_address_check_out from "./Components/Add_address_check_out.jsx";
import ConfirmOrder from "./Components/ConfirmOrder.jsx";
import FailedOrder from "./Components/FailedOrder.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/about", element: <About /> },
      { path: "/shop", element: <Shop /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      { path: "/signin", element: <Signin /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/products", element: <Products /> },
      { path: "/OTP_verify_email", element: <Verify_email_OTP /> },
      { path: "/Forgot_password_OTP", element: <Forgot_password_OTP /> },
      { path: "/ResetPassword", element: <ResetPassword /> },
      { path: "/product/:id", element: <SingleProduct /> },
      { path: "/single_blog", element: <SingleBlog /> },
      { path: "/Add_address_check_out", element: <Add_address_check_out /> },
      {
        path: "/personal",
        element: <Personal />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "editProfile", element: <EditProfile /> },
          { path: "Add_address", element: <Add_address /> },
          {
            path: "order",
            element: <MyOrder />,
          },
        ],
      },

      { path: "/electronics", element: <Electronics /> },
      { path: "/checkout", element: <CheckOut /> },
      { path: "/ConfirmOrder", element: <ConfirmOrder /> },
      { path: "/FailedOrder", element: <FailedOrder /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}  />
);
