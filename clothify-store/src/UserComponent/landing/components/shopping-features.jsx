import { Row, Col, Typography } from 'antd';
import { TruckOutlined, ShopOutlined, MoneyCollectOutlined, FireOutlined, CreditCardOutlined } from '@ant-design/icons';
import React from 'react';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function ShoppingFeatures() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Row justify="center" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
        
        {/* Island Wide Delivery */}
        <Col xs={8} sm={12} md={4} style={{ textAlign: 'center' }}>
          <Row justify="center" align="middle" style={{ flexDirection: 'row' ,}}>
            <TruckOutlined className='me-3' style={{ fontSize: '24px', color: '#EF5350' }} />
            <Typography style={{ fontSize: isMobile ? '10px': '18px', fontWeight: 'normal', textAlign: 'left' }}>
              ISLAND WIDE <br/>DELIVERY
            </Typography>
          </Row>
        </Col>

        {/* Island Wide Stores */}
        <Col xs={8} sm={12} md={4} style={{ textAlign: 'center' }}>
          <Row justify="center" align="middle" style={{ flexDirection: '#EF5350' , }}>
            <ShopOutlined className='me-3' style={{ fontSize: '24px', color: '#EF5350' }} />
            <Typography style={{ fontSize: isMobile ? '10px': '18px', fontWeight: 'normal', textAlign: 'left' }}>
              ISLAND WIDE<br/> STORES
            </Typography>
          </Row>
        </Col>

        {/* Cash On Delivery */}
        <Col xs={8} sm={12} md={4} style={{ textAlign: 'center' }}>
          <Row justify="center" align="middle" style={{ flexDirection: 'row', }}>
            <MoneyCollectOutlined className='me-3' style={{ fontSize: '24px', color: '#EF5350'}} />
            <Typography style={{ fontSize: isMobile ? '10px': '18px', fontWeight: 'normal' , textAlign: 'left'}}>
              CASH ON <br/>DELIVERY
            </Typography>
          </Row>
        </Col>

        {/* Unlimited Unique Designs */}
        <Col xs={8} sm={12} md={4} style={{ textAlign: 'center' }}>
          <Row justify="center" align="middle" style={{ flexDirection: 'row',  }}>
            <FireOutlined className='me-3' style={{ fontSize: '24px', color: '#EF5350'}} />
            <Typography style={{ fontSize: isMobile ? '10px': '18px', fontWeight: 'normal', textAlign: 'left' }}>
              UNLIMITED <br/> DESIGNS
            </Typography>
          </Row>
        </Col>

        {/* Secure Payments */}
        <Col xs={8} sm={12} md={4} style={{ textAlign: 'center' }}>
          <Row justify="center" align="middle" style={{ flexDirection: 'row',  }}>
            <CreditCardOutlined className='me-3' style={{ fontSize: '24px', color: '#EF5350'}} />
            <Typography style={{ fontSize: isMobile ? '10px': '18px', fontWeight: 400, textAlign: 'left' }}>
              SECURE<br/> PAYMENTS
            </Typography>
          </Row>
        </Col>

      </Row>
    </div>
  );
}

export default ShoppingFeatures;
