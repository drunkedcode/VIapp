import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import Sidebar from './Sidebar';
import './ViLayout.css';
export default function ViLayout() {
    return (<div className="vi">
      <Navbar />
      <main className="vi__content">
        <Outlet />
      </main>
      <BottomNav />
      <Sidebar />
    </div>);
}
