import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalTestComp = () => {
  return (
    <div style={{ maxWidth: 500, margin: "50px auto", padding: 20, border: "1px solid #ccc", borderRadius: 10 }}>
      <h2>🧪 PayPal Test Checkout</h2>

      <PayPalScriptProvider options={{
        "client-id": "sb",  // ← "sb" is PayPal’s dummy sandbox ID that works for quick testing
        currency: "USD"
      }}>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: { value: "9.99" } // 👈 Dummy amount > 0
              }]
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              alert(`✅ Payment completed by ${details.payer.name.given_name}`);
              console.log("Full payment details:", details);
            });
          }}
          onCancel={() => {
            alert("❌ Payment cancelled.");
          }}
          onError={(err) => {
            console.error("⚠️ PayPal error:", err);
            alert("Something went wrong while processing your payment.");
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalTestComp;
