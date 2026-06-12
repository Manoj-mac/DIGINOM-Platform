import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import Skills from "./pages/Skills";
import AddSkill from "./pages/AddSkill";
import Certifications from "./pages/Certifications";
import AddCertification from "./pages/AddCertification";
import EditCertification from "./pages/EditCertification";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route

          path="/employees"
          element={<Employees />}
        />
        <Route
          path="/employees/add"
          element={<AddEmployee />}
        />
        <Route
          path="/employees/edit/:employeeId"
          element={<EditEmployee />}
        />
        <Route
          path="/skills"
          element={<Skills />}
        />
        <Route
          path="/skills/add"
          element={<AddSkill />}
        />
        <Route
          path="/certifications"
          element={<Certifications />}
        />
        <Route
          path="/certifications/add"
          element={<AddCertification />}
        />
        <Route
          path="/certifications/edit/:certificationId"
          element={<EditCertification />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;