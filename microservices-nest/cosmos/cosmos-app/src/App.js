import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import OrderManagement from './components/order-management.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <nav>
            <Navigation nav={"Order manaement"} url={"/order-management"}></Navigation>
          </nav>
        </div>
        <Routes>
          <Route path="/order-management" element={<OrderManagement />}></Route>
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
