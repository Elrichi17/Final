import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Components/Home';
import { Models } from './Components/Models';
import { MakeupProducts } from './Components/MakeupProducts';
import { FashionEvents } from './Components/FashionEvents';
import { PhotoSales } from './Components/PhotoSales';
import { ExclusiveMemberships } from './Components/ExclusiveMemberships';
import { ContactUs } from './Components/ContactUs';
import ProtectedRoute from './ProtectedRoute';
import { AdminDashboard } from './Components/AdminDashBoard';
const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/models" element={<ProtectedRoute component={Models} />} />
      <Route path="/makeup-products" element={<ProtectedRoute component={MakeupProducts} />} />
      <Route path="/fashion-events" element={<ProtectedRoute component={FashionEvents} />} />
      <Route path="/photo-sales" element={<ProtectedRoute component={PhotoSales} />} />
      <Route path="/memberships" element={<ProtectedRoute component={ExclusiveMemberships} />} />
      <Route path="/contact-us" element={<ProtectedRoute component={ContactUs} />} />
      <Route path="/secretURL-admin" element={<ProtectedRoute component={AdminDashboard} />} />
    </Routes>
  </Router>
);

export default AppRoutes;
