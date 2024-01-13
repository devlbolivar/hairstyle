import React from "react";
import ReactDOM from "react-dom/client";
//import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { HelmetProvider } from "react-helmet-async";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import store from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider
          deferLoading={true}
          options={{
            clientId: "",
          }}
        >
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
