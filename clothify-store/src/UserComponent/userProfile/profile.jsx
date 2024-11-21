import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, message, Avatar } from "antd";
import { GetProfileApi } from "../../Api/profile/GetProfileApi";
import { UpdateProfileApi } from "../../Api/profile/updateProfileApi";
import axios from "axios";

function Profile() {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cusId, setCusId] = useState(null);


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
          cus_id: data.cus_id,
        });
        if (data.profilePicture) {
          setImageUrl(data.profilePicture);
        }
        if(data.cus_id){
          setCusId(data.cus_id);
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

  const onFinish = async (values) => {
    console.log("Form Submitted:", values);
    const updatedProfile = {
      ...values,
      cus_id: cusId, 
      profilePicture: imageUrl,  
    };

    try {
      await UpdateProfileApi(updatedProfile);
      message.success("Profile updated successfully");
    } catch (error) {
      message.error("Failed to update profile");
    }
  };

  const handleAvatarClick = () => {
    document.getElementById("fileInput").click();
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ClothifyStore");

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dvw0hnvbs/image/upload`,
            formData
        );
        return response.data.secure_url;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
  
      try {
        const uploadedImageUrl = await uploadImage(file);
  
        if (uploadedImageUrl) {
          message.success("Profile picture uploaded successfully");
  
          form.setFieldsValue({ profilePicture: uploadedImageUrl });
  
          setImageUrl(uploadedImageUrl);
  
        }
      } catch (error) {
        message.error("Failed to upload the profile picture. Please try again.");
      }
    }
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
          profilePicture: sampleProfileData.profilePicture,
        }}
      >
        {/* Profile Picture */}
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              src={imageUrl}
              size={100}
              style={{ marginBottom: 10, cursor: "pointer" }}
              onClick={handleAvatarClick}
            />
          </div>
          {/* Hidden File Input */}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
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
          <Input disabled/>
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
