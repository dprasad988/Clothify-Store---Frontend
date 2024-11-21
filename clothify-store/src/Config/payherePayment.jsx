import { message } from "antd";
import { loadPayHere } from "./payhereLoader"; 
import { AddOrderApi } from "../Api/order/addOrderApi";
import { UpdateProductQuantityApi } from "../Api/order/updateProductQtyApi";
import { UpdatePaidApi } from "../Api/order/updatePaidApi"

export const handleBuyNow = async (buyNowOrderData, close, billingId) => {

  // const orderData = {
  //   status: "Pending",  
  //   date: new Date().toISOString().split('T')[0],
  //   billingId: billingId,
  //   products: [
  //     {
  //       productId: product.productId,
  //       productName: product.productName,
  //       color: selectedColor,
  //       size: selectedSize,
  //       quantity: quantity,
  //       totalPrice: totalPrice
  //     }
  //   ]
  // };

  const data = await AddOrderApi(buyNowOrderData);

  if (data) {
    const { hash, orderId } = data;
    message.success("Order success.");

    // Proceed with the payment process
    try {
      const payhere = await loadPayHere();  

      const payment = {
        sandbox: true,  
        merchant_id: "1228623",
        return_url: undefined, 
        cancel_url: undefined, 
        notify_url: undefined,
        order_id: orderId,
        items: product.productName,
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

      // Set up PayHere callbacks
      payhere.onCompleted = async (paymentOrderId) => {
        message.success(`Payment successful. Order ID: ${paymentOrderId}`);

        try {
          const isSuccess = await UpdateProductQuantityApi({
            productId: product.productId,
            quantity: quantity,       
            color: selectedColor,         
            size: selectedSize,
          });

          const isPaymentUpdated = await UpdatePaidApi({
            orderId : paymentOrderId,
            isPaid: true,
          })
                    
          if(isPaymentUpdated){
            message.success("Payment updated successfully.");
          }
          else if(!isPaymentUpdated){
            message.error("Failed to update payment.");
          }
          
          if(isSuccess){
            message.success("Product quantity updated successfully.");
          }
          else if(!isSuccess){
            message.error("Failed to update product quantity.");
          }

        } catch (error) {
          console.error("Failed to update product quantity:", error);
          message.error("Failed to update product quantity.");
        }
        window.location.href = `http://localhost:5173/invoice?orderId=${paymentOrderId}`;
        close(); 
      };

      payhere.onDismissed = () => {
        console.log("Payment dismissed");
        message.info("Payment dismissed");
        close(); 
      };

      payhere.onError = (error) => {
        console.error("Payment error: ", error);
        message.error("Payment error: " + error);
      };

      // Start the payment process
      payhere.startPayment(payment);

    } catch (error) {
      console.error("Failed to load PayHere SDK.");
      message.error("Failed to load PayHere SDK.");
    }

  } else {
    message.error("Order failed");
  }

};
