import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/DantaSportslogo.png";
import { 
    DashboardOutlined, 
    SettingOutlined, 
    CalendarOutlined, 
    BarChartOutlined, 
    StarOutlined, 
    PlayCircleOutlined, 
    TeamOutlined,
    DownOutlined,
    RightOutlined,
    UserOutlined,
    HomeOutlined,
    TrophyOutlined,
    CameraOutlined,
    DollarOutlined,
    GiftOutlined,
    ClockCircleOutlined,
    FileTextOutlined,
    MessageOutlined,
    ControlOutlined
} from '@ant-design/icons';

const VendorSidebar = ({ onSelect }) => {
    const location = useLocation();
    const pathname = location.pathname;

    const [openMenus, setOpenMenus] = useState({
        manage: false,
        reports: false,
        runEvent: false,
        gym: false,
        eventReport: false,
    });

    const toggleMenu = (key) =>
        setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));

    const isActive = (path) => pathname === path;

    return (
        <aside className="vendor-sidebar">
            {/* Logo */}
            <div className="sidebar-logo">
                <img src={logo} alt="Danta Sports" />
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {/* Dashboard */}
                    <li>
                        <Link
                            to="/vendor"
                            className={`sidebar-menu-item ${isActive('/vendor') ? 'active' : ''}`}
                            onClick={() => onSelect('Dashboard')}
                        >
                            <DashboardOutlined className="sidebar-menu-icon" />
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    {/* Manage - Submenu */}
                    <li>
                        <button
                            onClick={() => toggleMenu('manage')}
                            className={`sidebar-submenu-toggle ${openMenus.manage ? 'active' : ''}`}
                        >
                            <div className="flex items-center">
                                <SettingOutlined className="sidebar-menu-icon" />
                                <span>Manage</span>
                            </div>
                            {openMenus.manage ? 
                                <DownOutlined className="sidebar-arrow" /> : 
                                <RightOutlined className="sidebar-arrow" />
                            }
                        </button>
                        <ul className={`sidebar-submenu ${openMenus.manage ? 'open' : ''}`}>
                            <li>
                                <Link
                                    to="/vendor/manage/basic-info"
                                    className={`sidebar-submenu-item ${isActive('/vendor/manage/basic-info') ? 'active' : ''}`}
                                    onClick={() => onSelect('Manage')}
                                >
                                    <UserOutlined className="sidebar-menu-icon" />
                                    Basic Info
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/manage/venuelist"
                                    className={`sidebar-submenu-item ${isActive('/vendor/manage/venuelist') ? 'active' : ''}`}
                                    onClick={() => onSelect('Manage')}
                                >
                                    <HomeOutlined className="sidebar-menu-icon" />
                                    Venue List
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/manage/sports"
                                    className={`sidebar-submenu-item ${isActive('/vendor/manage/sports') ? 'active' : ''}`}
                                    onClick={() => onSelect('Manage')}
                                >
                                    <TrophyOutlined className="sidebar-menu-icon" />
                                    Sports
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/manage/court"
                                    className={`sidebar-submenu-item ${isActive('/vendor/manage/court') ? 'active' : ''}`}
                                    onClick={() => onSelect('Manage')}
                                >
                                    <TrophyOutlined className="sidebar-menu-icon" />
                                    Sports Court
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/manage/slotpricing"
                                    className={`sidebar-submenu-item ${isActive('/vendor/manage/slotpricing') ? 'active' : ''}`}
                                    onClick={() => onSelect('Manage')}
                                >
                                    <DollarOutlined className="sidebar-menu-icon" />
                                    Slot Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/manage/images"
                                    className={`sidebar-submenu-item ${isActive('/vendor/manage/images') ? 'active' : ''}`}
                                    onClick={() => onSelect('Manage')}
                                >
                                    <CameraOutlined className="sidebar-menu-icon" />
                                    Images
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/manage/member"
                                    className={`sidebar-submenu-item ${isActive('/vendor/manage/member') ? 'active' : ''}`}
                                    onClick={() => onSelect('Manage')}
                                >
                                    <TeamOutlined className="sidebar-menu-icon" />
                                    Member
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/manage/discount"
                                    className={`sidebar-submenu-item ${isActive('/vendor/manage/discount') ? 'active' : ''}`}
                                    onClick={() => onSelect('Manage')}
                                >
                                    <GiftOutlined className="sidebar-menu-icon" />
                                    Discount
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* Booking */}
                    <li>
                        <Link
                            to="/vendor/dayslots"
                            className={`sidebar-menu-item ${isActive('/vendor/dayslots') ? 'active' : ''}`}
                            onClick={() => onSelect('Dayslots')}
                        >
                            <CalendarOutlined className="sidebar-menu-icon" />
                            <span>Booking</span>
                        </Link>
                    </li>

                    {/* Reports - Submenu */}
                    <li>
                        <button
                            onClick={() => toggleMenu('reports')}
                            className={`sidebar-submenu-toggle ${openMenus.reports ? 'active' : ''}`}
                        >
                            <div className="flex items-center">
                                <BarChartOutlined className="sidebar-menu-icon" />
                                <span>Reports</span>
                            </div>
                            {openMenus.reports ? 
                                <DownOutlined className="sidebar-arrow" /> : 
                                <RightOutlined className="sidebar-arrow" />
                            }
                        </button>
                        <ul className={`sidebar-submenu ${openMenus.reports ? 'open' : ''}`}>
                            <li>
                                <Link
                                    to="/vendor/reports/booking"
                                    className={`sidebar-submenu-item ${isActive('/vendor/reports/booking') ? 'active' : ''}`}
                                    onClick={() => onSelect('Reports')}
                                >
                                    <CalendarOutlined className="sidebar-menu-icon" />
                                    Booking
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/reports/revenue"
                                    className={`sidebar-submenu-item ${isActive('/vendor/reports/revenue') ? 'active' : ''}`}
                                    onClick={() => onSelect('Reports')}
                                >
                                    <DollarOutlined className="sidebar-menu-icon" />
                                    Revenue
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/reports/rating"
                                    className={`sidebar-submenu-item ${isActive('/vendor/reports/rating') ? 'active' : ''}`}
                                    onClick={() => onSelect('Reports')}
                                >
                                    <StarOutlined className="sidebar-menu-icon" />
                                    Rating
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/reports/coupan"
                                    className={`sidebar-submenu-item ${isActive('/vendor/reports/coupan') ? 'active' : ''}`}
                                    onClick={() => onSelect('Reports')}
                                >
                                    <GiftOutlined className="sidebar-menu-icon" />
                                    Coupon
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/reports/peakhours"
                                    className={`sidebar-submenu-item ${isActive('/vendor/reports/peakhours') ? 'active' : ''}`}
                                    onClick={() => onSelect('Reports')}
                                >
                                    <ClockCircleOutlined className="sidebar-menu-icon" />
                                    Peak Hours
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* Reviews */}
                    <li>
                        <Link
                            to="/vendor/reviews"
                            className={`sidebar-menu-item ${isActive('/vendor/reviews') ? 'active' : ''}`}
                            onClick={() => onSelect('Reviews')}
                        >
                            <StarOutlined className="sidebar-menu-icon" />
                            <span>Reviews</span>
                        </Link>
                    </li>



                    {/* Run/Event - Submenu */}
                    <li>
                        <button
                            onClick={() => toggleMenu('runEvent')}
                            className={`sidebar-submenu-toggle ${openMenus.runEvent ? 'active' : ''}`}
                        >
                            <div className="flex items-center">
                                <PlayCircleOutlined className="sidebar-menu-icon" />
                                <span>Run/Event</span>
                            </div>
                            {openMenus.runEvent ? 
                                <DownOutlined className="sidebar-arrow" /> : 
                                <RightOutlined className="sidebar-arrow" />
                            }
                        </button>
                        <ul className={`sidebar-submenu ${openMenus.runEvent ? 'open' : ''}`}>
                            <li>
                                <Link
                                    to="/vendor/runEvent/basicInfo"
                                    className={`sidebar-submenu-item ${isActive('/vendor/runEvent/basicInfo') ? 'active' : ''}`}
                                    onClick={() => onSelect('Run/Event')}
                                >
                                    <UserOutlined className="sidebar-menu-icon" />
                                    Basic Info
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/runEvent/createEvent"
                                    className={`sidebar-submenu-item ${isActive('/vendor/runEvent/createEvent') ? 'active' : ''}`}
                                    onClick={() => onSelect('Run/Event')}
                                >
                                    <PlayCircleOutlined className="sidebar-menu-icon" />
                                    Create Event
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/runEvent/eventlist"
                                    className={`sidebar-submenu-item ${isActive('/vendor/runEvent/eventlist') ? 'active' : ''}`}
                                    onClick={() => onSelect('Run/Event')}
                                >
                                    <FileTextOutlined className="sidebar-menu-icon" />
                                    Event List
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/runEvent/communication"
                                    className={`sidebar-submenu-item ${isActive('/vendor/runEvent/communication') ? 'active' : ''}`}
                                    onClick={() => onSelect('Run/Event')}
                                >
                                    <MessageOutlined className="sidebar-menu-icon" />
                                    Communication
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/runEvent/booking"
                                    className={`sidebar-submenu-item ${isActive('/vendor/runEvent/booking') ? 'active' : ''}`}
                                    onClick={() => onSelect('Run/Event')}
                                >
                                    <CalendarOutlined className="sidebar-menu-icon" />
                                    Booking
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => toggleMenu('eventReport')}
                                    className={`sidebar-submenu-toggle ${openMenus.eventReport ? 'active' : ''}`}
                                >
                                    <div className="flex items-center">
                                        <BarChartOutlined className="sidebar-menu-icon" />
                                        <span>Reports</span>
                                    </div>
                                    {openMenus.eventReport ? 
                                        <DownOutlined className="sidebar-arrow" /> : 
                                        <RightOutlined className="sidebar-arrow" />
                                    }
                                </button>
                                <ul className={`sidebar-nested-submenu ${openMenus.eventReport ? 'open' : ''}`}>
                                    <li>
                                        <Link
                                            to="/vendor/runEvent/reports/revenue"
                                            className={`sidebar-nested-submenu-item ${isActive('/vendor/runEvent/reports/revenue') ? 'active' : ''}`}
                                        >
                                            Revenue
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/vendor/runEvent/reports/rating"
                                            className={`sidebar-nested-submenu-item ${isActive('/vendor/runEvent/reports/rating') ? 'active' : ''}`}
                                        >
                                            Rating
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/vendor/runEvent/reports/coupan"
                                            className={`sidebar-nested-submenu-item ${isActive('/vendor/runEvent/reports/coupan') ? 'active' : ''}`}
                                        >
                                            Coupon
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/runEvent/member"
                                    className={`sidebar-submenu-item ${isActive('/vendor/runEvent/member') ? 'active' : ''}`}
                                    onClick={() => onSelect('Run/Event')}
                                >
                                    <TeamOutlined className="sidebar-menu-icon" />
                                    Member
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/runEvent/images"
                                    className={`sidebar-submenu-item ${isActive('/vendor/runEvent/images') ? 'active' : ''}`}
                                    onClick={() => onSelect('Run/Event')}
                                >
                                    <CameraOutlined className="sidebar-menu-icon" />
                                    Images
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* Gym - Submenu */}
                    <li>
                        <button
                            onClick={() => toggleMenu('gym')}
                            className={`sidebar-submenu-toggle ${openMenus.gym ? 'active' : ''}`}
                        >
                            <div className="flex items-center">
                                <TeamOutlined className="sidebar-menu-icon" />
                                <span>Gym</span>
                            </div>
                            {openMenus.gym ? 
                                <DownOutlined className="sidebar-arrow" /> : 
                                <RightOutlined className="sidebar-arrow" />
                            }
                        </button>
                        <ul className={`sidebar-submenu ${openMenus.gym ? 'open' : ''}`}>
                            <li>
                                <Link
                                    to="/vendor/gym/basicInfo"
                                    className={`sidebar-submenu-item ${isActive('/vendor/gym/basicInfo') ? 'active' : ''}`}
                                    onClick={() => onSelect('Gym')}
                                >
                                    <UserOutlined className="sidebar-menu-icon" />
                                    Basic Info
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/gym/gymInfo"
                                    className={`sidebar-submenu-item ${isActive('/vendor/gym/gymInfo') ? 'active' : ''}`}
                                    onClick={() => onSelect('Gym')}
                                >
                                    <HomeOutlined className="sidebar-menu-icon" />
                                    Gym Info
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/gym/booking"
                                    className={`sidebar-submenu-item ${isActive('/vendor/gym/booking') ? 'active' : ''}`}
                                    onClick={() => onSelect('Gym')}
                                >
                                    <CalendarOutlined className="sidebar-menu-icon" />
                                    Booking
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/gym/reports"
                                    className={`sidebar-submenu-item ${isActive('/vendor/gym/reports') ? 'active' : ''}`}
                                    onClick={() => onSelect('Gym')}
                                >
                                    <BarChartOutlined className="sidebar-menu-icon" />
                                    Reports
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/gym/member"
                                    className={`sidebar-submenu-item ${isActive('/vendor/gym/member') ? 'active' : ''}`}
                                    onClick={() => onSelect('Gym')}
                                >
                                    <TeamOutlined className="sidebar-menu-icon" />
                                    Member
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/gym/images"
                                    className={`sidebar-submenu-item ${isActive('/vendor/gym/images') ? 'active' : ''}`}
                                    onClick={() => onSelect('Gym')}
                                >
                                    <CameraOutlined className="sidebar-menu-icon" />
                                    Images
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/gym/discount"
                                    className={`sidebar-submenu-item ${isActive('/vendor/gym/discount') ? 'active' : ''}`}
                                    onClick={() => onSelect('Gym')}
                                >
                                    <GiftOutlined className="sidebar-menu-icon" />
                                    Discount
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor/gym/control"
                                    className={`sidebar-submenu-item ${isActive('/vendor/gym/control') ? 'active' : ''}`}
                                    onClick={() => onSelect('Gym')}
                                >
                                    <ControlOutlined className="sidebar-menu-icon" />
                                    Control
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            
            {/* Copyright Footer */}
            <div className="sidebar-footer">
                <p className="sidebar-copyright">
                    Copyright © 2025 Danta Sports Pvt. Ltd.
                </p>
            </div>
        </aside>
    );
};

export default VendorSidebar;
