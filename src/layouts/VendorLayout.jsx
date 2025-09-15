import { Outlet } from 'react-router-dom';
import VendorSidebar from '../features/vendor/VendorSiderbar';
import VendorHeader from '../features/vendor/VendorHeader';
import userImage from "../assets/userImage.png";
import { useState } from 'react';

const VendorLayout = () => {
     const [title, setTitle] = useState('Dashboard');

    const user = {
        name: 'Deepak',
        role: 'Vendor',
        avatarUrl: userImage,
    };
    
    return (
        <div className="vendor-layout">
            {/* Fixed Sidebar */}
            <aside className="vendor-sidebar-fixed">
                <VendorSidebar onSelect={(heading) => setTitle(heading)}/>
            </aside>
            
            {/* Main Content Area */}
            <div className="vendor-main-wrapper">
                <VendorHeader title={title} user={user} />
                <main className="vendor-main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
};

export default VendorLayout;
