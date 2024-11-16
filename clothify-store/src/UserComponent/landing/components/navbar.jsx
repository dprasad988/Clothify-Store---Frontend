import React, { useEffect, useState } from "react";
import { Menu, Drawer } from "antd";
import { colors } from "../../../colors";
import { Input, Select, Button } from "antd";
import { LockOutlined, UserOutlined, HeartOutlined, MailOutlined, GlobalOutlined, HeartFilled } from "@ant-design/icons";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link } from 'react-router-dom'
import Cart from "../../cart/cart";
import { Badge } from 'antd';
import { useCart } from "../../cart/CartContext";

const { Option } = Select;

function NavBar() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const { cartCount, updateCartCount } = useCart();


  const handleOpenCart = () => {
    setOpen(true);
  };
  const handleCloseCart = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };
  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  return (
    <div style={{ backgroundColor: colors.primary }}>
      <div className="container-fluid">
        <div className="row align-items-center ">
          {/* Logo Section */}
          <div className="col-6 col-md-3 d-flex">
          <div style={{ width: "100%"}}>
            <Link to="/">
            <img 
              src="logo1.png" 
              alt="Logo" 
              style={{ 
                width: "100%",       
                maxWidth: "200px",
                maxHeight: "80px",
                height: "100%",       
                objectFit: "cover"  
              }} 
            />
            </Link>
          </div>
          </div>

          {/* Mobile Menu and Shopping Cart Icons (End of Screen) */}
          <div className="col-6 d-md-none d-flex justify-content-end align-items-center p-0 ml-auto pe-2">

            <div className="me-3">
              <Badge count={cartCount}>
                <ShoppingCartOutlined style={{ fontSize: "30px", color: "white" }}/>
              </Badge>
            </div>  

            <Link to='/login'>
                <UserOutlined style={{ fontSize: "25px", color: "white", marginRight: 10  }} />
            </Link>
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: '25px', color: "white" }}/>}
              onClick={showDrawer}
              style={{ padding: 0 }}
            />
          </div>

          {/* Search Bar Section for Desktop */}
          <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
            <Input placeholder="Search..." style={{ width: 350, height: 40, borderRadius: "20px" }} />
            <Button
              type="primary"
              style={{ width: 45, height: 40, marginLeft: "10px" }}
              icon={<SearchOutlined />}
            />
          </div>



          {/* My Account text for Desktop */}
          <div className="col-3 d-none d-md-flex justify-content-end align-items-center">
            <div>
              <div className="d-flex justify-content-center ">
                {/* <span className="me-2" style={{ color: "red",fontSize: "14px", }}> <HeartFilled/></span>
                <span className="me-2" style={{ color: "red",fontSize: "14px" }}> <MailOutlined/></span>
                <span className="me-2" style={{ color: "white",fontSize: "14px" }}> <GlobalOutlined/></span>
                <span className="me-2" style={{ color: "white",fontSize: "14px" }}> LKR </span> */}
                <span style={{ color: "white",fontSize: "20px" }}>My Account</span>
              </div>
            </div>

            <div className="px-3">
              <Link to='/login'>
                <UserOutlined style={{ fontSize: "25px", color: "#FF9800", marginRight: "15px" }}/>
              </Link>
              <Badge count={cartCount} overflowCount={99}>
                <ShoppingCartOutlined style={{ fontSize: "30px", color: "#FF9800" }} onClick={handleOpenCart}/>
              </Badge>
            </div>

          </div>

        </div>
      </div>

      {/* Drawer for Mobile Search Bar */}
      <Drawer
        title="Search"
        placement="top"
        onClose={closeDrawer}
        open={isDrawerVisible}
        height="auto"
      >
        <Input
          placeholder="Search..."
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <Select
          defaultValue="All Categories"
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <Option value="all">All Categories</Option>
          <Option value="men">Men</Option>
          <Option value="women">Women</Option>
          <Option value="kids">Kids</Option>
          <Option value="baby-toys">Baby Toys</Option>
        </Select>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          style={{ width: "100%" }}
        >
          Search
        </Button>
      </Drawer>

      {/* /////////////////////////Second navbar////////////////////////////////// */}

      <div
        style={{
          backgroundColor: colors.secondary,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
        }}
        className="d-none d-md-flex align-items-center"
      >
        {/* Container for Menu and Sign In section */}
        <div className="d-flex justify-content-between align-items-center w-100" style={{marginLeft: '120px'}}>
          {/* Centered Navigation Menu */}
          <Menu
            mode="horizontal"
            style={{
              backgroundColor: colors.secondary,
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
            }}
          >
            {/* Men SubMenu */}
            <Menu.SubMenu
              key="men-submenu"
              title={
                <span style={{ marginLeft: "10px", color: "white", fontSize: "17px" }}>
                  Men
                </span>
              }
            >
              <Menu.Item key="men-tshirt">T-Shirt</Menu.Item>
              <Menu.Item key="men-shirt">Shirt</Menu.Item>
              <Menu.Item key="men-jeans">Jeans</Menu.Item>
            </Menu.SubMenu>

            {/* Women SubMenu */}
            <Menu.SubMenu
              key="women-submenu"
              title={
                <span style={{ marginLeft: "10px", color: "white", fontSize: "17px" }}>
                  Women
                </span>
              }
            >
              <Menu.Item key="women-tshirt">T-Shirt</Menu.Item>
              <Menu.Item key="women-shirt">Shirt</Menu.Item>
              <Menu.Item key="women-jeans">Jeans</Menu.Item>
            </Menu.SubMenu>

            {/* Kids SubMenu */}
            <Menu.SubMenu
              key="kids-baby-submenu"
              title={
                <span style={{ marginLeft: "10px", color: "white", fontSize: "17px" }}>
                  Kids
                </span>
              }
            >
              <Menu.Item key="kids-tshirt">T-Shirt</Menu.Item>
              <Menu.Item key="kids-shirt">Shirt</Menu.Item>
              <Menu.Item key="kids-jeans">Jeans</Menu.Item>
            </Menu.SubMenu>

            {/* Toys SubMenu */}
            <Menu.SubMenu
              key="toys-submenu"
              title={
                <span style={{ marginLeft: "10px", color: "white", fontSize: "17px" }}>
                  Toys
                </span>
              }
            >
              <Menu.Item key="toys-plush">Plush Toys</Menu.Item>
              <Menu.Item key="toys-educational">Educational Toys</Menu.Item>
              <Menu.Item key="toys-puzzles">Puzzles</Menu.Item>
            </Menu.SubMenu>
          </Menu>

          {/* End Section: Icon and Sign In */}
          <div className="d-flex align-items-end me-4">
            <LockOutlined style={{ color: "white", marginRight: "10px" }} />
            <h6 className="text-white fw-normal mb-0" style={{cursor: 'pointer'}}>Sign up | Sign in</h6>
          </div>

        </div>
      </div>
            
      <Cart open={open} close={handleCloseCart}/>
    </div>
  );
}

export default NavBar;
