import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { TextField, Button, Box } from "@mui/material";
import { UpdateBillingDetailsApi } from "../../Api/billing/updateBillingDetailsApi";
import { message } from 'antd';
import { GetBillingDetailsApi } from "../../Api/billing/GetBillingDetailsApi";

function DeliveryAddress() {
  const [formData, setFormData] = useState({
    billingId: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    cusId: "",
  });
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetBillingDetailsApi();
        if (response && response.data) {
          setFormData(response.data); 
        } else {
          setFormData({
            billingId: "",
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            postalCode: "",
            country: "",
            phoneNumber: "",
            cusId: "",
          });
        }
      } catch (error) {
        console.error("Error fetching delivery address:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const { billingId, ...data } = formData; 
      if (!billingId) {
        message.error("Billing ID is missing.");
        return;
      }
      const isUpdate = await UpdateBillingDetailsApi(data, billingId);
      if(isUpdate){
        message.success("Address updated successfully!");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      message.error("Failed to update address.");
    }
  };

  return (
    <Box>
      <Row gutter={[16, 16]} style={{maxWidth: '600px', margin: "0 auto"}}>

        <Col span={12}>
          <TextField
            label="First Name"
            fullWidth
            size="small"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </Col>
        <Col span={12}>
          <TextField
            label="Last Name"
            fullWidth
            size="small"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </Col>
        <Col span={24}>
          <TextField
            label="Address"
            fullWidth
            size="small"
            multiline
            rows={2}
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </Col>
        <Col span={12}>
          <TextField
            label="City"
            fullWidth
            size="small"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </Col>
        <Col span={12}>
          <TextField
            label="Postal Code"
            fullWidth
            size="small"
            value={formData.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
          />
        </Col>
        <Col span={12}>
          <TextField
            label="Country"
            fullWidth
            size="small"
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </Col>
        <Col span={12}>
          <TextField
            label="Phone Number"
            fullWidth
            size="small"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        </Col>
        <Col span={24}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Save Address
          </Button>
        </Col>
      </Row>
    </Box>
  );
}

export default DeliveryAddress;
