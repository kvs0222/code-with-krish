import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import OrderManagement from './components/order-management.jsx';
import CustomerManagement from './components/customer-management.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <nav>
            <Navigation nav={"Order manaement"} url={"/order-management"}></Navigation>
            <Navigation nav={"customer manaement"} url={"/customer-management"}></Navigation>
          </nav>
        </div>
        <Routes>
          <Route path="/order-management" element={<OrderManagement />}></Route>
          <Route path="/customer-management" element={<CustomerManagement />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
function Navigation({ nav, url }) {
  return (
    <li>
      <Link to={url}>{nav}</Link>
    </li>
  )
}
export default App;
