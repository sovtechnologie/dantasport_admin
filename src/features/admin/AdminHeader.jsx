// src/components/VendorHeader.jsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/Slices/authSlice"; // Adjust path as needed

import { Layout, Dropdown, Avatar, Menu, Typography, Space } from "antd";
import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const { Header } = Layout;
const { Title, Text } = Typography;

export default function AdminHeader({ title = "Bookings", user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.auth.user);

  const items = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link to="/admin/profile">Profile</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => {
        dispatch(logout()); // clear Redux state and cookies
        navigate("/login"); // redirect to login screen
      },
    },
  ];

  return (
    <>
      <Container>
        <Header
          className="bg-white ps-4 flex items-center justify-between"
          style={{
            background: "#fff",
            height: "80px", // set your desired header height
            lineHeight: "80px", // ensure content is vertically centered
            padding: "0 24px",
          }}
        >
          <Title level={3}>
            {title}
          </Title>

          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <a
              onClick={(e) => e.preventDefault()}
              style={{ marginRight: 50, display: "flex", alignItems: "center" }}
            >
              <Space>
                <Avatar src={user.avatarUrl} shape="square" size={48} />
                <div className="flex flex-col">
                  <Text strong className="leading-tight">
                    {admin?.full_name}
                  </Text>
                  <Text type="secondary" className="text-xs leading-tight">
                    {user.role}
                  </Text>
                </div>
                <DownOutlined style={{ color: "black" }} />
              </Space>
            </a>
          </Dropdown>
        </Header>
      </Container>
    </>
  );
}
