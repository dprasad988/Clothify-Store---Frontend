import { message } from "antd";
import { loadPayHere } from "./payhereLoader"; 
import { UpdateProductQuantityApi } from "../Api/order/updateProductQtyApi";
import { UpdatePaidApi } from "../Api/order/updatePaidApi"
import { AddOrderApi } from "../Api/order/addOrderApi";

export const handleBuyFromCart = async ( orderData, close, clearCart,) => {
    
    const { date, products, status, billingId} = orderData;
    const orderPayload = { date, products, status, billingId };

    const data = await AddOrderApi(orderPayload);

  if (data) {
    const { hash, orderId } = data;
    message.success("Order success.");

    // Proceed with the payment process
    try {
      const payhere = await loadPayHere();  
      const totalPrice = products.reduce((sum, item) => sum + item.totalPrice, 0);

      const payment = {
        sandbox: true,  
        merchant_id: "1228623",
        return_url: undefined, 
        cancel_url: undefined, 
        notify_url: undefined,
        order_id: orderId,
        items: products.map((item) => item.productName).join(", "),
        hash: hash,  
        amount: totalPrice, 
        currency: "LKR",
        first_name: "CustomerFirstName", 
        last_name: "CustomerLastName",
        email: "customer@example.com",
        phone: "0123456789", 
        address: "Customer Address",  
        city: "Colombo",
        country: "Sri Lanka", 
      };

        // PayHere Callbacks
      payhere.onCompleted = async (paymentOrderId) => {
        message.success(`Payment successful. Order ID: ${paymentOrderId}`);

        try {
          // Update quantity for all products
          const updateResults = await Promise.all(
            products.map((product) =>
              UpdateProductQuantityApi({
                productId: product.productId,
                quantity: product.quantity,
                color: product.color,
                size: product.size,
              })
            )
          );

          // Check if all updates were successful
          if (updateResults.every((result) => result)) {
            message.success("Product quantities updated successfully.");
          } else {
            message.warning("Some product quantities failed to update.");
          }

          // Update payment status
          const isPaymentUpdated = await UpdatePaidApi({
            orderId: paymentOrderId,
            isPaid: true,
          });

          if (isPaymentUpdated) {
            message.success("Payment status updated successfully.");
            clearCart();
          } else {
            message.error("Failed to update payment status.");
          }
        } catch (error) {
          console.error("Failed to update product quantities or payment:", error);
          message.error("Error updating product quantities or payment.");
        }

        // Redirect to invoice page
        window.location.href = `http://localhost:5173/invoice?orderId=${paymentOrderId}`;
        close();
      };

      payhere.onDismissed = () => {
        message.info("Payment dismissed.");
        close();
      };

      payhere.onError = (error) => {
        console.error("Payment error:", error);
        message.error("Payment error: " + error);
      };

      // Start payment
      payhere.startPayment(payment);
    } catch (error) {
      console.error("Failed to load PayHere SDK:", error);
      message.error("Failed to load PayHere SDK.");
    }
  } else {
    message.error("Order creation failed.");
  }
}