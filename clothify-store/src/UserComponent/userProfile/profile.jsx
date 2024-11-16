import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Avatar } from "antd";
import { GetProfileApi } from "../../Api/profile/GetProfileApi";
import ProfileDashboard from "./profileDashboard";

function Profile() {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);


  const sampleProfileData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    profilePicture: "https://example.com/path/to/profile-picture.jpg",
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      if (!token) {
        message.error("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const data = await GetProfileApi(token);
        form.setFieldsValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
        if (data.profilePicture) {
          setImageUrl(data.profilePicture);
        }
        if(data.cus_id){
          localStorage.setItem("cus_id", data.cus_id);
        }

      } catch (error) {
        message.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [form]);

  const onFinish = (values) => {
    console.log("Form Submitted:", values);
    // Here, you can handle the submission of the form, like sending data to the server
    message.success("Profile updated successfully");
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #d9d9d9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          firstName: sampleProfileData.firstName,
          lastName: sampleProfileData.lastName,
          email: sampleProfileData.email,
        }}
      >
        {/* Profile Picture */}
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Avatar src={imageUrl} size={100} style={{ marginBottom: 10 }} />
          </div>
        </Form.Item>

        {/* First Name */}
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>

        {/* Last Name */}
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save Profile
          </Button>
        </Form.Item>
      </Form>

    </div>
  );
}

export default Profile;
