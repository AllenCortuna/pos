import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Notfound from "./component/Notfound";
import Good from "./component/good/Good";
import Login from "./component/user/Login";
import Dashboard from "./component/dashboard/Dashboard";
import Sale from "./component/sale/Sale";
import Expense from "./component/expense/Expense";
import Incoming from "./component/incoming/Incoming";
import History from "./component/history/History";
import Logout from "./component/Logout";
import Reset from "./component/user/Reset";
import OTP from "./component/user/OTP";
import Setting from "./component/setting/Setting";
import PatchContact from "./component/setting/PatchContact";
import PatchEmail from "./component/setting/PatchEmail";
import Invoice from "./component/invoice/Invoice";
import Drawer from "./component/drawer/Drawer";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={ <Secure> <Dashboard /> </Secure> } />
          <Route path="/good" element={ <Secure> <Good /> </Secure> } />
          <Route path="/sale" element={ <Secure> <Sale /> </Secure> } />
          <Route path="/incoming" element={ <Secure> <Incoming /> </Secure> } />
          <Route path="/invoice" element={ <Secure> <Invoice /> </Secure> } />
          <Route path="/expense" element={ <Secure> <Expense /> </Secure> } />
          <Route path="/drawer" element={ <Secure> <Drawer /> </Secure> } />
          <Route path="/history" element={ <Secure> <History /> </Secure> } />
          <Route path="/setting" element={ <Secure> <Setting /> </Secure> } />
          <Route path="/patchContact" element={ <Secure> <PatchContact /> </Secure> } />
          <Route path="/PatchEmail" element={ <Secure> <PatchEmail /> </Secure> } />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/reset" element={ <Reset/> } />
          <Route path="/otp" element={ <OTP/> } />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
export function Secure({ children }) {
  if (localStorage.getItem("profile") || localStorage.getItem("Secure")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

