import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ServicesTag from "../ServicesTag";
import { Provider } from "react-redux";
import { persistor, store } from "../../redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import HeaderNavigation from "../HeaderNavigation";

const RouteLayout = () => {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <Header />
        <div className=" p-2  bg-white z-40 border pt-10">
          <HeaderNavigation />
        </div>
        <ScrollRestoration />
        <Outlet />
        <ServicesTag />
        <Footer />
      </PersistGate>
    </Provider>
  );
};

export default RouteLayout;
