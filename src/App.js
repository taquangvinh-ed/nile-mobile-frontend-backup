import { Route, Routes } from "react-router-dom";
import CustomerRouters from "./Routers/CustomerRouters";
import { ToastContainer } from "react-toastify";
import AdminRouters from "./Routers/AdminRouters";


function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRouters />}></Route>
        <Route path="/admin/*" element={<AdminRouters/>}></Route>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
