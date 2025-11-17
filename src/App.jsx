import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import JobsPage from "./pages/JobsPage";
import SignUpPage from "./pages/SignUpPage";
import CompanySignUp from "./pages/CompanySignUp";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./components/UserContext";
import EmployerProfilePage from "./pages/EmployerProfilePage";
import Dashboard from "./components/Dashboard";
import NewJobForm from "./components/NewJobForm";
import JobEdit from "./components/JobEdit";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="*" element={<NotFound />} />
      <Route index element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/companysignup" element={<CompanySignUp />} />
      <Route path="/company/:id" element={<EmployerProfilePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/jobs/new" element={<NewJobForm />} />
      <Route path="/jobs/:id/edit" element={<JobEdit />} />
    </Route>
  )
);

const App = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
