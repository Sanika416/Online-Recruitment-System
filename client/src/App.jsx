import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import JobPostings from "./pages/JobPostings"
import Pipeline from "./pages/Pipeline"
import Candidate from "./pages/Candidate"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/job-postings"
          element={<JobPostings />}
        />

        <Route
          path="/pipeline"
          element={<Pipeline />}
        />

        <Route
          path="/candidates"
          element={<Candidate />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App