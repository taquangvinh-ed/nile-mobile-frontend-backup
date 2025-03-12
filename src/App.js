import { Route, Routes } from "react-router-dom";
import CustomerRouters from "./Routers/CustomerRouters";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRouters />}></Route>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
