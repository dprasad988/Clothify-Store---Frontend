import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { GetOrderByIdApi } from '../../Api/order/getOrderByIdApi';
import sampleInvoiceData from './invoiceData';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const { Title, Text } = Typography;

function Invoice() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get('orderId');

  const[items, setItems] = useState(sampleInvoiceData)
  const[invoiceData, setInvoiceData] = useState()
  const products = invoiceData?.products || [];
  
  const { customerFirstName, customerLastName, customerEmail } = products?.[0] || {};

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const data = await GetOrderByIdApi(orderId);
        if (data) {
          setInvoiceData(data);
        }
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };
  
    fetchInvoiceData();
  }, [orderId]);

  const company = "Clothify Store (PVT) Ltd,";
  const street = "123 Main Street,";
  const city = "Panadura,";
  const country = "Sri Lanka.";
  const email = "clothify@sample.com";
  const mobile = "+94 123 456 789";


  useEffect(() => {
    if (invoiceData && invoiceData.products) {
      setItems(invoiceData.products);
    }
  }, [invoiceData]);
  
  const subTotal = items.reduce((acc, item) => acc + item.totalPrice, 0) || 0;
  const tax = subTotal * 0;
  const deliveryFee = 0;
  const grandTotal = subTotal + tax + deliveryFee;
  const date = new Date();
  const localeDate = date.toLocaleString('en-SL', {
    hour12: false, 
  }); 

  const handlePrintPdf = async () => {
    const invoiceElement = document.getElementById('invoice'); // Add an ID to your invoice container
    if (invoiceElement) {
      const canvas = await html2canvas(invoiceElement, { scale: 2 }); // Capture as a high-resolution image
      const imageData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait, millimeters, A4
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      pdf.addImage(imageData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('invoice.pdf'); // Download the PDF
    }
  };

  return (
    <div id="invoice" style={{ maxWidth: "800px", margin: "20px auto", padding: "40px", border: "1px solid #ddd" , backgroundColor: '#fff5f3', }}>
      {/* Header */}
      <Row style={{ marginBottom: "20px" }}>
        <Col xs={12} sm={12}>
          <img src='logo-ori.png' alt="Company Logo" style={{ width: "100px" , backgroundColor: 'black'}} />
        </Col>
        <Col xs={12} sm={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
          <Text ellipsis>{company}</Text>
          <Text ellipsis>{street}</Text>
          <Text ellipsis>{city}</Text>
          <Text ellipsis>{country}</Text>
          <Text ellipsis>{email}</Text>
        </Col>
      </Row>
      <hr />

      {/* Billed To */}
      <Row style={{ marginBottom: "20px" }}>
        <Col xs={12} sm={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <Text className='fw-bold'>BILLED TO:</Text>
          <Text>{customerFirstName} {customerLastName}</Text>
          <Text>{customerEmail}</Text>
        </Col>
        <Col xs={12} sm={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
          <Text className='fw-bold'>INVOICE</Text>
          <Text>Invoice No: 123</Text>
          <Text>{localeDate}</Text>
        </Col>
      </Row>
      <hr />


      {/* Items Table */}
      <TableContainer component={Paper} style={{ marginBottom: "20px" ,}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Unit Price</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.productName}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">Rs. {(item.totalPrice / item.quantity).toFixed(2)}</TableCell>
                <TableCell align="center">Rs. {item.totalPrice}.00</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Totals */}
      <Row justify="end">
        <Col xs={14} sm={19} style={{ fontSize: "16px", display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <Text>Subtotal: </Text>
          <Text>Tax (0%): </Text>
          <Text>Delivery Fee: </Text>
          <Title level={4}>Total: </Title>
        </Col>
        <Col xs={10} sm={5} style={{ fontSize: "16px", display: 'flex', flexDirection: 'column', alignItems: 'flex-end', }}>
          <Text strong>Rs. {subTotal.toFixed(2)}</Text>
          <Text strong>Rs. {tax.toFixed(2)}</Text>
          <Text strong>Rs. {deliveryFee.toFixed(2)}</Text>
          <Title level={4}>Rs. {grandTotal.toFixed(2)}</Title>
        </Col>
      </Row>
      <hr />

      {/* Footer */}
      <Row style={{ marginTop: "30px" }} justify="space-between">
        <Col>
            <Text className='fs-6'>Thank you for shopping with us!</Text>
        </Col>
        <Col>
            <Button onClick={handlePrintPdf}>Print Pdf</Button>
        </Col>
      </Row>

    </div>
  );
}

export default Invoice;
