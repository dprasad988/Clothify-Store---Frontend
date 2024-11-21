import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import StatCard from "./StatCard";
import OrdersChart from "./OrdersChart";
import ClothingCategoryChart from "./ClothingCategoryChart";
import PopularProductsTable from "./PopularProductsTable";
import { GetOrderCountApi } from "../../Api/order/getOrderCountApi";
import { GetUserCountApi } from "../../Api/signup/getUserCountApi";
import { GetProductCountApi } from "../../Api/product/getProductCountApi";

function Dashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalSales: 0,
  });

  useEffect(() => {
    const fetchCountData = async () => {
      try {
        const orderCount = (await GetOrderCountApi()).data;
        const userCount = (await GetUserCountApi()).data;
        const productCount = (await GetProductCountApi()).data;

        setStats({
          totalCustomers: userCount,
          totalOrders: orderCount,
          totalProducts: productCount,
          totalSales: 24000,
        });
      } catch (error) {
        console.error("Error fetching count data:", error);
      }

    }
    
    fetchCountData();
  }, []);

  const cardData = [
    {
      title: "Total Customers",
      count: stats.totalCustomers,
      icon: <UserOutlined style={{ fontSize: "24px", color: "#1890ff" }} />,
    },
    {
      title: "Total Orders",
      count: stats.totalOrders,
      icon: (
        <ShoppingCartOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
      ),
    },
    {
      title: "Total Products",
      count: stats.totalProducts,
      icon: <AppstoreOutlined style={{ fontSize: "24px", color: "#faad14" }} />,
    },
    {
      title: "Total Sales",
      count: `Rs. ${stats.totalSales.toLocaleString()}`,
      icon: <DollarOutlined style={{ fontSize: "24px", color: "#eb2f96" }} />,
    },
  ];

  return (
    <div >
      <div style={{ padding: "20px" }}>
        <Row gutter={[16, 16]}>
          {cardData.map((card, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <StatCard title={card.title} count={card.count} icon={card.icon} />
            </Col>
          ))}
        </Row>
      </div>
      <Row gutter={[16, 16]} className="mt-3">
          <Col xs={24} sm={12} md={12}>
            <OrdersChart />
          </Col>
          <Col xs={24} sm={12} md={12}>
            <ClothingCategoryChart />
          </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-5">
          <Col xs={24} sm={12} md={8}>
            <PopularProductsTable />
          </Col>
      </Row>

    </div>
  );
}

export default Dashboard;
