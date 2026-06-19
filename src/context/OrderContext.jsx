import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const OrderContext = createContext();

export const useOrders = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedOrders =
      localStorage.getItem("orders");

    return savedOrders
      ? JSON.parse(savedOrders)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );
  }, [orders]);


  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          const createdTime =
            new Date(
              order.createdAt
            ).getTime();

          const now =
            new Date().getTime();

          const hoursPassed =
            (now - createdTime) /
            (1000 * 60 * 60);

          let status =
            "Order Placed";

          let progress = 25;

          if (hoursPassed >= 45) {
            status = "Confirmed";
            progress = 50;
          }

          if (hoursPassed >= 90) {
            status = "Shipped";
            progress = 75;
          }

          if (hoursPassed >= 135) {
            status = "Delivered";
            progress = 100;
          }

          return {
            ...order,
            orderStatus: status,
            progress,
          };
        })
      );
    }, 60000);

    return () =>
      clearInterval(interval);
  }, []);

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
const placeOrder = (orderData) => {
  const newOrder = {
    ...orderData,

    items:
      orderData.items ||
      orderData.cartItems ||
      [],

    customer:
      orderData.customer || {},

    total:
      orderData.total || 0,

    orderStatus:
      "Order Placed",

    paymentMethod:
      "Cash On Delivery",

    createdAt:
      new Date().toLocaleString(),

    progress: 25,

    returnEligible: true,

    returnRequested: false,

    returnStatus: null,

    trackingSteps: [
      "Order Placed",
      "Confirmed",
      "Packed",
      "Shipped",
      "Out For Delivery",
      "Delivered",
    ],
  };

  setOrders((prevOrders) => [
    newOrder,
    ...prevOrders,
  ]);
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
  const requestReturn = (
    orderId,
    reason
  ) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
            ...order,
            returnRequested: true,
            returnStatus:
              "Pending",
            returnReason:
              reason,
          }
          : order
      )
    );
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
    localStorage.removeItem(
      "orders"
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
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