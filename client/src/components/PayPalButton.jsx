import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalButton({
  orderTotal,
  handlePayModalClose,
  cartItems,
  setOrderDetails,
  orderId,
  updateOrder,
}) {
  console.log(orderTotal);
  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId:
            "AbH9nKFU4ySEfZR80ny8t_oID1bEqlFSTazFhLdmi6DhmF2MmFF7GtCX09ukOojmMXMUyk54wyTkgRyc",
        }}
      >
          <PayPalButtons
            style={{ layout: "vertical", shape: "rect"}}
            className="p-3 bg-light"
            createOrder={(data, actions) => {
              // console.log(actions.order.create)
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: orderTotal?.cartSubTotal, // Ensure the total is formatted to 2 decimal places
                      breakdown: {
                        item_total: {
                          currency_code: "USD",
                          value: orderTotal?.cartSubTotal,
                        },
                      },
                    },
                    items: cartItems.map((item) => ({
                      name: item.name,
                      unit_amount: {
                        currency_code: "USD",
                        value: item.price,
                      },
                      quantity: item.quantity,
                    })),
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              const details = await actions.order.capture();
              console.log("Payment successful:", details);
              // onPaymentSuccess(details); // Callback to handle payment success
              let amount = details.purchase_units[0].amount.value;
              if (
                details.status === "COMPLETED" &&
                +orderTotal.cartSubTotal === +amount
              ) {
                // console.log("update order in database")
                updateOrder(orderId)
                  .then((res) => {
                    if (res.order.isPaid) {
                      setOrderDetails((prev) => ({
                        ...prev,
                        isPaid: true,
                        paidAt: res.order.paidAt,
                      }));
                    }
                  })
                  .catch((err) => console.log(err.response?.data?.message));
              }

              handlePayModalClose();
            }}
            onCancel={() => {
              console.log("Payment was cancelled");
              handlePayModalClose();
            }}
            onError={(err) => {
              console.error("Payment error:", err);
              handlePayModalClose();
            }}
          />
      </PayPalScriptProvider>
    </div>
  );
}

export default PayPalButton;
