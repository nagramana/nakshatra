
import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const API_URL = "https://nakshatra-mart-backend.onrender.com";



const OrderContext = createContext();

export const useOrders = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] =
    useState([]);

  const fetchOrders = async () => {
    try {
      const response =
        await axios.get(
  `${API_URL}/api/orders`
);

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  // Place Order
  //   useEffect(() => {
  //   const interval = setInterval(() => {
  //     setOrders((prevOrders) =>
  //       prevOrders.map((order) => {
  //         const createdTime =
  //           new Date(order.createdAt).getTime();

  //         const now = Date.now();

  //         const hoursPassed =
  //           (now - createdTime) /
  //           (1000 * 60 * 60);

  //         let status =
  //           "Order Placed";

  //         let progress = 25;

  //         if (hoursPassed >= 45) {
  //           status = "Confirmed";
  //           progress = 50;
  //         }

  //         if (hoursPassed >= 90) {
  //           status = "Shipped";
  //           progress = 75;
  //         }

  //         if (hoursPassed >= 135) {
  //           status = "Delivered";
  //           progress = 100;
  //         }

  //         return {
  //           ...order,
  //           orderStatus: status,
  //           progress,
  //         };
  //       })
  //     );
  //   }, 60000);

  //   return () =>
  //     clearInterval(interval);
  // }, []);

  // Place Order
  const placeOrder = async (
    orderData
  ) => {

    const newOrder = {

  ...orderData,

  createdAt: new Date(),

  progress:
    orderData.progress || 25,

  returnEligible: true,

  returnRequested: false,

  returnStatus: null,

  trackingSteps:
  orderData.trackingSteps || [
    "Pending",
    "Ordered",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ],

};
    console.log(
      "Sending Order",
      newOrder
    );

    try {

  const response =
  await axios.post(
    `${API_URL}/api/orders`,
    newOrder
  );

      await fetchOrders();

      return response.data.order;

    } catch (error) {

      console.log(error);

    }
  };

  // Update Status
  const updateOrderStatus = (
    orderId,
    newStatus
  ) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
            ...order,
            orderStatus: newStatus,
          }
          : order
      )
    );
  };

  // Return Request
  const requestReturn = async (
    orderId,
    reason
  ) => {

    try {
      await axios.put(
  `${API_URL}/api/orders/return/${orderId}`,
  {
    reason,
  }
);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
              ...order,
              returnRequested: true,
              returnStatus: "Pending",
              returnReason: reason,
            }
            : order
        )
      );

      alert(
        "Return Request Submitted"
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Approve Return
  const approveReturn = (
    orderId
  ) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
            ...order,
            returnStatus:
              "Approved",
            orderStatus:
              "Order Returned",
          }
          : order
      )
    );
  };

  // Reject Return
  const rejectReturn = (
    orderId
  ) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
            ...order,
            returnStatus:
              "Rejected",
          }
          : order
      )
    );
  };

  // Delete Order
  const deleteOrder = (
    orderId
  ) => {
    setOrders((prevOrders) =>
      prevOrders.filter(
        (order) =>
          order.id !== orderId
      )
    );
  };

  // Clear All Orders
  const clearOrders = () => {
    setOrders([]);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        fetchOrders,
        placeOrder,
        updateOrderStatus,
        requestReturn,
        approveReturn,
        rejectReturn,
        deleteOrder,
        clearOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;