import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Button } from "antd";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notifications from "./pages/Notifications";
import Userslist from "./pages/Admin/Userslist";
import DoctorsList from "./pages/Admin/DoctorsList";
import Profile from "./pages/Doctor/Profile";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import Records from "./pages/Doctor/Records";
import ViewRecords from "./pages/Doctor/ViewRecords";
import About from "./pages/Doctor/About";
import DoctorCard from "./components/DoctorCard";
import Dashboard from "./pages/Admin/Dashboard";
import AnimalProfile from "./pages/AnimalProfile";
import ViewAppointments from "./pages/ViewAppointments";
import Bookings from "./pages/Bookings";
import Update from "./pages/Update";
import HelpCentre from "./pages/HelpCentre";
import AnimalsList from "./pages/Admin/AnimalsList";
import AnimalCard from "./components/AnimalCard";
import ViewHelp from "./pages/Doctor/ViewHelp";
import HelpNotifications from "./components/HelpNotifications";
import AppointmentsList from "./pages/Admin/AppointmentsList"
import HelpView from "./components/HelpView";
import ApplyPharmacist from "./pages/ApplyPharmacist"
import PharmacistList from "./pages/Admin/PharmacistList";
import HomeNavigatePharmacy from "./pages/HomeNavigatePharmacy"
import NavigateInventory from "./pages/NavigateInventory"
import NavigatePresByUserId from "./pages/NavigatePresByUserId";
import NavigatePharmacistDashboard from "./pages/NavigatePharmacistDashboard"
import NavigateSalesUI from "./pages/NavigateSalesUI";
import NavigateSupplierUI from "./pages/NavigateSupplierUI";
import NavigateReceivingUI from "./pages/NavigateReceivingUI";
import NavigateExpiredUI from "./pages/NavigateExpiredUI";
import AnimalDetails from "./pages/AnimalDetails";
import BillingPayment from "./pages/Doctor/BillingPayment"
import PaymentCalculation from "./pages/Doctor/PaymentCalculation"

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoute>
              <ApplyDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply-pharmacist"
          element={
            <ProtectedRoute>
              <ApplyPharmacist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/userslist"
          element={
            <ProtectedRoute>
              <Userslist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute>
              <AppointmentsList/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctorslist"
          element={
            <ProtectedRoute>
              <DoctorsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pharmacistlist"
          element={
            <ProtectedRoute>
              <PharmacistList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book-appointment/:doctorId"
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
         <Route
          path="/view-details/:animalId"
          element={
            <ProtectedRoute>
              <AnimalDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute>
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="doctor/records"
          element={
            <ProtectedRoute>
              <Records />
            </ProtectedRoute>
          }
        />
        <Route
          path="doctor/view_records"
          element={
            <ProtectedRoute>
              <ViewRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path="user/view_records"
          element={
            <ProtectedRoute>
              <ViewRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path="doctor/about"
          element={
            <ProtectedRoute>
              <DoctorCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <AnimalProfile />
            </ProtectedRoute>
          }
        />
         <Route
          path="/user/prescriptions"
          element={
            <ProtectedRoute>
              <NavigatePresByUserId />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/update"
          element={
            <ProtectedRoute>
              <Update />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/register"
          element={
            <ProtectedRoute>
              <AnimalProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/help"
          element={
            <ProtectedRoute>
              <HelpCentre />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/animalslist"
          element={
            <ProtectedRoute>
              <AnimalsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/animalprofile"
          element={
            <ProtectedRoute>
              <AnimalCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/help"
          element={
            <ProtectedRoute>
              <HelpCentre />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/help"
          element={
            <ProtectedRoute>
              <ViewHelp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/notifications"
          element={
            <ProtectedRoute>
              <HelpView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacist/home"
          element={
            <ProtectedRoute>
              <HomeNavigatePharmacy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacist/dashboard"
          element={
            <ProtectedRoute>
              <NavigatePharmacistDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacist/inventory"
          element={
            <ProtectedRoute>
              <NavigateInventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacist/sales"
          element={
            <ProtectedRoute>
              <NavigateSalesUI/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacist/supplier-list"
          element={
            <ProtectedRoute>
              <NavigateSupplierUI/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/pharmacist/receiving"
          element={
            <ProtectedRoute>
              <NavigateReceivingUI/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacist/expired-list"
          element={
            <ProtectedRoute>
              <NavigateExpiredUI/>
            </ProtectedRoute>
          }
        /><Route
        path="/calculateBill/:billId"
        element={
          <ProtectedRoute>
            <PaymentCalculation/>
          </ProtectedRoute>
        }
      />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
