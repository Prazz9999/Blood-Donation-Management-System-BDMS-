import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Donation from './pages/Donation';
import Request from './pages/Request';
import OTP from './pages/OTP';
import DonorDashboard from './pages/DonorDashboard';
import DonorProfile from './pages/DonorProfile';
import AdminDashboard from './pages/AdminDashboard';
import AdminUserRecords from './pages/AdminUserRecords';
import AdminCamp from './pages/AdminCamp';
import AdminStock from './pages/AdminStock';

function App() {
  const path = window.location.pathname;

  switch (path) {
    case '/':
      return <Home />;
    case '/login':
      return <Login />;
    case '/signup':
      return <Signup />;
    case '/otp':
      return <OTP />;
    case '/donation':
      return <Donation />;
    case '/request':
      return <Request />;
    case '/dashboard':
      return <DonorDashboard />;
    case '/profile':
      return <DonorProfile />;
    case '/admin/dashboard':
    case '/admin/dashboard-menu':
      return <AdminDashboard />;
    case '/admin/user':
      return <AdminUserRecords />;
    case '/admin/camp':
      return <AdminCamp />;
    case '/admin/stock':
      return <AdminStock />;
    default:
      return <Home />;
  }
}

export default App;
