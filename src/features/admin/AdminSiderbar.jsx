import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/DantaSportslogo.png";

const AdminSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [openMenus, setOpenMenus] = useState({
    reports: false,
    enquires: false,
    banners: false,
    services: false,
  });

  const toggleMenu = (key) =>
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));

  const isActive = (path) => pathname === path;

  return (
    <aside className="w-64 bg-white  shadow-sm  px-4 py-6">
      {/* Logo */}
      <div className="flex justify-start mb-8 ml-4">
        <img src={logo} alt="Logo" className="h-10" />
      </div>

      <ul className="space-y-2 text-sm font-medium text-gray-600">
        {/* Dashboard */}
        <li>
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg ${isActive('/admin') ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              }`}
          >
            {/* <LayoutDashboard size={18} /> */}
            Dashboard
          </Link>
        </li>

        {/* Sports/Services */}
        <li>
          <Link
            to="/admin/sport-services"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg ${isActive('/admin/sports') ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              }`}
          >
            {/* <BarChart3 size={18} /> */}
            Sports/Services
          </Link>
        </li>

        {/* Reports - Submenu */}
        <li>
          <button
            onClick={() => toggleMenu('reports')}
            className="flex w-full items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              {/* <BarChart3 size={18} /> */}
              Reports
            </div>
            {/* {openMenus.reports ? <ChevronDown size={18} /> : <ChevronRight size={18} />} */}
          </button>
          {openMenus.reports && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/reports/bookings"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  Bookings
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/reports/revenue"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  Revenue
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/reports/rating"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  Rating
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/reports/coupan"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  Coupan
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/reports/peakHours"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  Peak Hours
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Enquires - Submenu */}
        <li>
          <button
            onClick={() => toggleMenu('enquires')}
            className="flex w-full items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              {/* <BarChart3 size={18} /> */}
              Enquires
            </div>
            {/* {openMenus.enquires ? <ChevronDown size={18} /> : <ChevronRight size={18} />} */}
          </button>
          {openMenus.enquires && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/enquires/vendor"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  Vendor enquiry
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/enquires/corporate"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  Corporate/Bulk booking enquiry
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/enquires/coach"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  Coach enquiry
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/enquires/gym"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  Gym enquiry
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/enquires/runEvent"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  Run/Event enquiry
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Vendors */}
        <li>
          <Link
            to="/admin/vendors"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg ${isActive('/admin/vendors') ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              }`}
          >
            {/* <Users size={18} /> */}
            Vendors
          </Link>
        </li>

        {/* Venues */}
        <li>
          <Link
            to="/admin/venues"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg ${isActive('/admin/venues') ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              }`}
          >
            {/* <MessageSquare size={18} /> */}
            Venues
          </Link>
        </li>

        {/* Amenities */}
        <li>
          <Link
            to="/admin/amenities"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg ${isActive('/admin/amenities') ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              }`}
          >
            {/* <Settings size={18} /> */}
            Amenities
          </Link>
        </li>

        {/* Banners - Submenu */}
        <li>
          <button
            onClick={() => toggleMenu('banners')}
            className="flex w-full items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              {/* <Image size={18} /> */}
              Banners
            </div>
            {/* {openMenus.banners ? <ChevronDown size={18} /> : <ChevronRight size={18} />} */}
          </button>
          {openMenus.banners && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/banners/home"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  By Admin
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/banners/vendor"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  By Vendor
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Services - Submenu */}
        <li>
          <button
            onClick={() => toggleMenu('services')}
            className="flex w-full items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              {/* <Layers3 size={18} /> */}
              Services
            </div>
            {/* {openMenus.services ? <ChevronDown size={18} /> : <ChevronRight size={18} />} */}
          </button>
          {openMenus.services && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/services/sports"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  Sports
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/services/runEvent"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  Run/Events
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/services/hostPlay"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  Host/Play
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/services/gym"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  Gym
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/services/coaching"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  Coaching
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
