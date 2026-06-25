import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";
import "./styles/responsive.css";
import "./styles/CardMaster.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";

ReactDOM.createRoot(
document.getElementById("root")
).render(

<React.StrictMode>


<AuthProvider>

  <OrderProvider>

    <CartProvider>

      <LoadingProvider>

        <App />

      </LoadingProvider>

    </CartProvider>

  </OrderProvider>

</AuthProvider>


</React.StrictMode>

);
