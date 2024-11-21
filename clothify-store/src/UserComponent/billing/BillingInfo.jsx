import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button, Radio, Divider } from "antd";
import { useCart } from "../cart/CartContext";
import { AddBillingDetailsApi } from "../../Api/billing/AddBillingDetailsApi";
import { AddOrderApi } from "../../Api/order/addOrderApi";
import {handleBuyFromCart} from "../../Config/payherePaymentCart"
import { message } from "antd";

const BillingInfo = () => {
  const [paymentMethod, setPaymentMethod] = useState("helaPay");
  const { billingData } = useCart();
  const { orderData, close, clearCart } = billingData;

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleBillingSubmit = async (values) => {
    const billingDetails = values;
  
    try {
      // Handle billing details submission
      let response;
      try {
        response = await AddBillingDetailsApi(billingDetails);
      } catch (error) {
        throw new Error("Failed to add billing details");
      }
  
      const billingId = response?.billingId;
  
      if (!billingId) {
        message.error("Billing ID not found in the response");
        return;
      }
  
      orderData.billingId = billingId;
  
      if (paymentMethod === "helaPay") {
        try {
          await handleBuyFromCart(orderData, close, clearCart);
        } catch (error) {
          throw new Error("Failed to process HelaPay payment");
        }
      } else if (paymentMethod === "cashOnDelivery") {
        let orderResponse;
        try {
          orderResponse = await AddOrderApi(orderData);
        } catch (error) {
          throw new Error("Failed to place order with Cash on Delivery");
        }
  
        if (orderResponse) {
          message.success("Order placed successfully with Cash on Delivery.");
          const paymentOrderId = orderResponse.orderId;
          // clearCart();   // meka hadanna tiyanawa
          setTimeout(() => {
            window.location.href = `http://localhost:5173/invoice?orderId=${paymentOrderId}`;
          }, 3000);

          close();
        } else {
          message.error("Failed to place order with Cash on Delivery.");
        }
      }
    } catch (error) {
      console.error("Error while processing the payment or order", error);
      message.error(
        "An error occurred while processing the payment or order. Please try again."
      );
    }
  };
  

  return (
    <Row justify={"center"}>
      {/* First Column */}
      <Col xs={24} md={10} style={{ padding: "20px" }}>
        {/* Billing Address */}
        <h3>Billing Address</h3>

        <Form layout="vertical" onFinish={handleBillingSubmit}>
          <Form.Item label="Country/Region" name="country">
            <Input placeholder="Enter your country or region" />
          </Form.Item>

          <Form.Item label="Full Name">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="firstName" noStyle>
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="lastName" noStyle>
                  <Input placeholder="Last Name" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input placeholder="Enter your address" />
          </Form.Item>

          <Form.Item label="City & Postal Code">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="city" // City field
                  noStyle
                >
                  <Input placeholder="City" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="postalCode" // Postal code field
                  noStyle
                >
                  <Input placeholder="Postal Code" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item label="Phone Number" name="phoneNumber">
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          {/* Shipping Method */}
          <Divider />
          <h3>Shipping Method</h3>
          <div
            className="d-flex justify-content-between"
            style={{
              border: "2px solid #1890ff",
              backgroundColor: "#e6f7ff",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <div>
              <Radio.Group defaultValue="islandDelivery">
                <Radio value="islandDelivery">All island delivery</Radio>
              </Radio.Group>
            </div>
            <div>Rs. 350..</div>
          </div>

          {/* Payment Method */}
          <Divider />
          <h3>Payment Method</h3>
          <div
            className="d-flex justify-content-between mb-3"
            style={{
              border: "2px solid #1890ff",
              backgroundColor: "#e6f7ff",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <div>
              <Radio.Group
                value={paymentMethod}
                onChange={handlePaymentChange}
                style={{ width: "100%" }}
              >
                <Radio value="helaPay">Hela Pay</Radio>
              </Radio.Group>
            </div>

            <div>
              <img
                src="visa.png"
                alt="Visa"
                style={{ height: "20px", marginLeft: "8px" }}
              />
              <img
                src="master.png"
                alt="MasterCard"
                style={{ height: "20px", marginLeft: "8px" }}
              />
              <img
                src="american.png"
                alt="american"
                style={{ height: "20px", marginLeft: "8px" }}
              />
              <img
                src="maestro.png"
                alt="maestro"
                style={{ height: "20px", marginLeft: "8px" }}
              />
            </div>
          </div>

          <div
            style={{
              border: "2px solid #1890ff",
              backgroundColor: "#e6f7ff",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <div>
              <Radio.Group value={paymentMethod} onChange={handlePaymentChange}>
                <Radio value="cashOnDelivery">Cash On Delivery</Radio>
              </Radio.Group>
            </div>
          </div>

          {/* Pay Now Button */}
          <Button
            type="primary"
            block
            style={{ marginTop: "16px" }}
            htmlType="submit"
          >
            Pay Now
          </Button>
        </Form>
      </Col>

      {/* Second Column */}
      <Col xs={24} md={10} style={{ padding: "20px" }}>
        <div
          style={{
            background: "#f0f0f0",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          {/* Map and Display Product Details */}
          <h3>Order Summary</h3>
          {orderData.products.map((product, index) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <Row align="middle" gutter={16}>
                <Col span={8}>
                  <img
                    src={product.coverPhotoUrl}
                    alt={product.productName}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                </Col>
                <Col span={16}>
                  <h4>{product.productName}</h4>
                  <p>
                    {product.color} | {product.size}
                  </p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Total Price: Rs {product.totalPrice}</p>
                </Col>
              </Row>
            </div>
          ))}

          {/* Price Summary */}
          <Divider />
          <Row justify="space-between">
            <Col>Subtotal:</Col>
            <Col>
              Rs.{" "}
              {orderData.products.reduce(
                (sum, product) => sum + product.totalPrice,
                0
              )}
              .00
            </Col>
          </Row>
          <Row justify="space-between">
            <Col>Shipping:</Col>
            <Col>Free</Col>
          </Row>
          <Divider />
          <Row justify="space-between">
            <Col>
              <h3>Grand Total:</h3>
            </Col>
            <Col>
              <h3>
                Rs.{" "}
                {orderData.products.reduce(
                  (sum, product) => sum + product.totalPrice,
                  0
                )}
                .00
              </h3>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default BillingInfo;
