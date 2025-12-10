// src/components/VendorHeader.jsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/Slices/authSlice";
import { Layout, Dropdown, Avatar,Typography, Space } from 'antd';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const { Header } = Layout;
const { Title, Text } = Typography;

export default function VendorHeader({ title = 'Bookings', user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const vendor = useSelector((state) => state.auth.user);


    //   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const value = e.target.value;
    
//     if (value == title) {
//       navigate(`/vendor/`);
//     }
//     else {

//         // (value == title)
//          navigate(`/vendor/dashboard/${value}`); 
//     }
    
//   };


    // Define menu items as an array of objects
    const items = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: <Link to="/vendor/profile">Profile</Link>,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: () => {
                dispatch(logout());      // clear Redux state and cookies
                navigate("/login");      // redirect to login screen
            },
        },
    ];

    return (
        <Header className="bg-white header_section">
            {/* <Title level={3} className="m-10">
                {title}
            </Title> */}
           <div className="row justify-content-between align-items-center">
              {/* <div className="col-3">
                    <Form.Select aria-label="Select Page" onChange={handleChange}>
                        <option>Dashboard</option>
                        <option value="/turf">Turf.jsx</option>
                        <option value="/two">Two</option>
                        <option value="/three">Three</option>
                    </Form.Select>
                </div> */}
                <div className="col-4">
                    <h3>{title}</h3>
                </div>
            <div className="col-6 text-end">
                <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" >
                <a onClick={(e) => e.preventDefault()} >
                    <Space>
                        <Avatar src={user.avatarUrl} shape="square" size={48} />
                        <div className="flex flex-col">
                            <Text strong className="leading-tight">{vendor?.full_name}</Text>
                            <Text type="secondary" className="text-xs leading-tight">
                                {user.role}
                            </Text>
                        </div>
                        <DownOutlined style={{ color: 'black' }} />
                    </Space>
                </a>
            </Dropdown>
            </div>
           </div>

            
        </Header>
    );
}
