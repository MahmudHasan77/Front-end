import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ServicesTag from "../ServicesTag";
import { Provider } from "react-redux";
import { persistor, store } from "../../redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

const RouteLayout = () => {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <Header />
        <ScrollRestoration />
        <Outlet />
        <ServicesTag />
        <Footer />
      </PersistGate>
    </Provider>
  );
};

export default RouteLayout;
