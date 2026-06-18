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

  // Place Order
  const placeOrder = (orderData) => {
    const newOrder = {
      ...orderData,

      orderStatus: "Order Placed",

      paymentMethod:
        "Cash On Delivery",

      createdAt:
        new Date().toLocaleString(),

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
    orderId
  ) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              returnRequested: true,
              returnStatus:
                "Pending",
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