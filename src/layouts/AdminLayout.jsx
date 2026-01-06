import { Outlet } from 'react-router-dom';
import AdminSidebar from '../features/admin/AdminSiderbar';
import AdminHeader from '../features/admin/AdminHeader';
import userImage from "../assets/userImage.png";
import Footer from './Footer';

const AdminLayout = () => {
  const user = {
    name: 'Suraj',
    role: 'Admin',
    avatarUrl: userImage,
  };

  return(
    <>
    <div className="flex  overflow-auto">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader  title="Dashboard" user={user}/>
        <main className="p-4 flex-1 overflow-auto" style={{background: "#F1F3F2"}}>
          <Outlet />
        </main>
        
      </div>
      
    </div>
    <Footer />
    </>
  )
};

export default AdminLayout;
