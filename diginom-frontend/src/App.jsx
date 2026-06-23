import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import Skills from "./pages/Skills";
import AddSkill from "./pages/AddSkill";
import EditSkill from "./pages/EditSkill";
import Certifications from "./pages/Certifications";
import AddCertification from "./pages/AddCertification";
import EditCertification from "./pages/EditCertification";
import Documents from "./pages/Documents";
import AddDocument from "./pages/AddDocument";
import AuditLogs from "./pages/AuditLogs";
import Jobs from "./pages/Jobs";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import JobMatches from "./pages/JobMatches";
import RecruiterDashboard
  from "./pages/RecruiterDashboard";
import Interviews from "./pages/Interviews";
import AddInterview from "./pages/AddInterview";
import EditInterview from "./pages/EditInterview";
import Offers from "./pages/Offers";
import AddOffer from "./pages/AddOffer";
import EditOffer from "./pages/EditOffer";
import Analytics from "./pages/Analytics";
import ResumeUpload from "./pages/ResumeUpload";
import Resumes from "./pages/Resumes";
import Recommendations from "./pages/Recommendations";
import PipelineDashboard
  from "./pages/PipelineDashboard";
import Timeline
  from "./pages/Timeline";
import RecruiterNotes
  from "./pages/RecruiterNotes";
import Notifications
  from "./pages/Notifications";
import EmployeeProfile
  from "./pages/EmployeeProfile";
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
          path="/skills/edit/:skillId"
          element={<EditSkill />}
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
        <Route
          path="/documents"
          element={<Documents />}
        />
        <Route
          path="/documents/add"
          element={<AddDocument />}
        />
        <Route
          path="/audit-logs"
          element={<AuditLogs />}
        />
        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/jobs/add"
          element={<AddJob />}
        />

        <Route
          path="/jobs/edit/:jobId"
          element={<EditJob />}
        />
        <Route
          path="/jobs/matches/:jobId"
          element={<JobMatches />}
        />
        <Route
          path="/recruiter-dashboard"
          element={<RecruiterDashboard />}
        />
        <Route
          path="/interviews"
          element={<Interviews />}
        />

        <Route
          path="/interviews/add"
          element={<AddInterview />}
        />

        <Route
          path="/interviews/edit/:id"
          element={<EditInterview />}
        />
        <Route
          path="/offers"
          element={<Offers />}
        />

        <Route
          path="/offers/add"
          element={<AddOffer />}
        />

        <Route
          path="/offers/edit/:id"
          element={<EditOffer />}
        />
        <Route
          path="/analytics"
          element={<Analytics />}
        />
        <Route
          path="/resume-upload"
          element={<ResumeUpload />}
        />

        <Route
          path="/resumes"
          element={<Resumes />}
        />
        <Route
          path="/jobs/:jobId/recommendations"
          element={<Recommendations />}
        />
        <Route
          path="/pipeline"
          element={
            <PipelineDashboard />
          }
        />
        <Route

          path="/timeline/:employeeId"

          element={
            <Timeline />
          }
        />
        <Route
          path="/recruiter-notes"
          element={
            <RecruiterNotes />
          }
        />
        <Route
          path="/notifications"
          element={<Notifications />}
        />
        <Route
          path="/employee-profile/:employeeId"
          element={<EmployeeProfile />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;