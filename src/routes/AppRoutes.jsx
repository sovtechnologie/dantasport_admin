import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { getUserRole } from "../utils/auth.js";
import ProtectedRoute from "../components/ProtectedRoute";
import { useSelector } from "react-redux";
import { Spin } from "antd";

const LoginPage = lazy(() => import("../pages/Login.jsx"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
// Temporary fix for dynamic import issue
import VendorLayout from "../layouts/VendorLayout";
// const VendorLayout = lazy(() => import('../layouts/VendorLayout'));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const VendorDashboard = lazy(() => import("../pages/vendor/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const AdminNotFound = lazy(() => import("../pages/admin/NotFound"));
const VendorNotFound = lazy(() => import("../pages/vendor/NotFound"));
const VendorServiceSelect = lazy(() =>
  import("../features/vendor/Component/VendorServiceSelect.jsx")
);

// Vendor routes
const VendorBookingPage = lazy(() =>
  import("../features/vendor/pages/ReportPage/BookingPage")
);
const VenManBasicInfo = lazy(() =>
  import("../features/vendor/pages/ManagePage/BasicInfo")
);
const VenuManVenueList = lazy(() =>
  import("../features/vendor/pages/ManagePage/VenueList.jsx")
);
const VenManVendorInfo = lazy(() =>
  import("../features/vendor/pages/ManagePage/VendorInfo")
);
const VenManSports = lazy(() =>
  import("../features/vendor/pages/ManagePage/Sports")
);
const VenManAddSport = lazy(() =>
  import("../features/vendor/pages/ManagePage/addSport")
);
const VenManEditSport = lazy(() =>
  import("../features/vendor/pages/ManagePage/EditSport.jsx")
);
const VenManCourt = lazy(() =>
  import("../features/vendor/pages/ManagePage/Court")
);
const VenManAddCourt = lazy(() =>
  import("../features/vendor/pages/ManagePage/addCourt")
);
const VenManImages = lazy(() =>
  import("../features/vendor/pages/ManagePage/Images")
);
const VenManAddImages = lazy(() =>
  import("../features/vendor/pages/ManagePage/addGallery")
);
const VenManSlots = lazy(() =>
  import("../features/vendor/pages/ManagePage/SlotPricing")
);
const VenManMember = lazy(() =>
  import("../features/vendor/pages/ManagePage/Member")
);
const VenManAddMember = lazy(() =>
  import("../features/vendor/pages/ManagePage/addMember")
);
const VenManDiscount = lazy(() =>
  import("../features/vendor/pages/ManagePage/Discount")
);
const VenManAddDiscount = lazy(() =>
  import("../features/vendor/pages/ManagePage/addCoupan")
);
const VenManEditDiscount = lazy(() =>
  import("../features/vendor/pages/ManagePage/EditCoupon")
);
const VenDaySlots = lazy(() =>
  import("../features/vendor/pages/Dayslot/DaySlots")
);
const BookedDetails = lazy(() =>
  import("../features/vendor/pages/Dayslot/BookedSlots")
);
const AvailableDetails = lazy(() =>
  import("../features/vendor/pages/Dayslot/AvailableSlots")
);
const VenRepRevenue = lazy(() =>
  import("../features/vendor/pages/ReportPage/RevenuePage")
);
const VenRepRating = lazy(() =>
  import("../features/vendor/pages/ReportPage/Rating")
);
const VenRepCoupon = lazy(() =>
  import("../features/vendor/pages/ReportPage/CouponPage")
);
const VenGymList = lazy(() => import("../features/vendor/pages/Gym/GymList"));
const VenGymAdd = lazy(() => import("../features/vendor/pages/Gym/AddGym"));
const VenGymEdit = lazy(() => import("../features/vendor/pages/Gym/EditGym"));
const VenGymMember = lazy(() =>
  import("../features/vendor/pages/Gym/GymMember")
);
const VenGymImages = lazy(() =>
  import("../features/vendor/pages/Gym/GymImages")
);
const VenGymDiscount = lazy(() =>
  import("../features/vendor/pages/Gym/GymDiscount")
);
const VenGymAddDiscount = lazy(() =>
  import("../features/vendor/pages/Gym/AddGymDiscount")
);
const VenGymEditDiscount = lazy(() =>
  import("../features/vendor/pages/Gym/EditGymDiscount")
);
const VenGymBooking = lazy(() =>
  import("../features/vendor/pages/Gym/GymBooking")
);
const VenGymCoaches = lazy(() =>
  import("../features/vendor/pages/Gym/GymCoaches")
);
const VenGymAddCoach = lazy(() =>
  import("../features/vendor/pages/Gym/AddGymCoach")
);
const VenGymEditCoach = lazy(() =>
  import("../features/vendor/pages/Gym/EditGymCoach")
);
const VenGymTimeSlots = lazy(() =>
  import("../features/vendor/pages/Gym/GymTimeSlots")
);
const VenGymAddTimeSlot = lazy(() =>
  import("../features/vendor/pages/Gym/AddGymTimeSlot")
);
const VenGymEditTimeSlot = lazy(() =>
  import("../features/vendor/pages/Gym/EditGymTimeSlot")
);

// Admin routes
const AdmSportService = lazy(() =>
  import("../features/admin/pages/SportServicesPage")
);
const VendorEnquiry = lazy(() =>
  import("../features/admin/pages/Enquires/VendorEnquiry")
);
const CorporateEnquiry = lazy(() =>
  import("../features/admin/pages/Enquires/CorporateEnquiry")
);

const VendorListPage = lazy(() =>
  import("../features/admin/pages/VendorListPage")
);
const AddVendor = lazy(() => import("../features/admin/pages/AddVendor"));
const EditVendor = lazy(() =>
  import("../features/admin/pages/EditVendorDetails.jsx")
);
const VenueListPage = lazy(() =>
  import("../features/admin/pages/VenueListPage")
);
const AddVenue = lazy(() => import("../features/admin/pages/AddVenue"));
const EditVenue = lazy(() =>
  import("../features/admin/pages/EditVenueDetails.jsx")
);
const AddBannerAdmin = lazy(() =>
  import("../features/admin/pages/AddBannerAdmin")
);
const AddBannerVendor = lazy(() =>
  import("../features/admin/pages/AddBannerVendor")
);
const SportsPage = lazy(() =>
  import("../features/admin/pages/Services/Sports")
);
const RunEventPage = lazy(() =>
  import("../features/admin/pages/Services/Run_Event")
);
const HostPlayPage = lazy(() =>
  import("../features/admin/pages/Services/Host_Play")
);
const GymPage = lazy(() => import("../features/admin/pages/Services/Gym"));
const CoachPage = lazy(() =>
  import("../features/admin/pages/Services/Coaching")
);
const Amenities = lazy(() => import("../features/admin/pages/AmenitiesPage"));

const AppRoutes = () => {
  const roleNum = useSelector((state) => state.auth.user?.role);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const role = roleNum === 3 ? "admin" : roleNum === 2 ? "vendor" : null;

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50vh",
          }}
        >
          {" "}
          <Spin size="large"></Spin>
        </div>
      }
    >
      <Routes>
        {/* ✅ Public Login Route (Common for both roles) */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🔒 Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            {/* Sport/Services */}
            <Route path="/admin/sport-services" element={<AdmSportService />} />
            {/* Enquires */}
            <Route path="/admin/enquires/vendor" element={<VendorEnquiry />} />
            <Route
              path="/admin/enquires/corporate"
              element={<CorporateEnquiry />}
            />
            {/* Vendor */}
            <Route path="/admin/vendors" element={<VendorListPage />} />
            <Route path="/admin/vendors/add-vendor" element={<AddVendor />} />
            <Route
              path="/admin/vendors/edit-vendor/:id"
              element={<EditVendor />}
            />
            {/* Venue */}
            <Route path="/admin/venues" element={<VenueListPage />} />
            <Route path="/admin/venues/add-venue" element={<AddVenue />} />
            <Route
              path="/admin/venues/edit-venue/:id"
              element={<EditVenue />}
            />
            {/* Banners */}
            <Route path="/admin/banners/home" element={<AddBannerAdmin />} />
            <Route path="/admin/banners/vendor" element={<AddBannerVendor />} />
            {/* Services */}
            <Route path="/admin/services/sports" element={<SportsPage />} />
            <Route path="/admin/services/runEvent" element={<RunEventPage />} />
            <Route path="/admin/services/hostPlay" element={<HostPlayPage />} />
            <Route path="/admin/services/gym" element={<GymPage />} />
            <Route path="/admin/services/coaching" element={<CoachPage />} />
            {/* Amenties */}
            <Route path="/admin/amenities" element={<Amenities />} />
            {/* Catch-all for admin routes */}
            <Route path="*" element={<AdminNotFound />} />
          </Route>
        </Route>

        {/* 🔒 Vendor Protected Routes */}
        <Route element={<ProtectedRoute allowedRole="vendor" />}>
          <Route path="/vendor" element={<VendorLayout />}>
            <Route index element={<VendorDashboard />} />
            {/* Manage Routes */}
            <Route
              path="/vendor/manage/basic-info"
              element={<VenManBasicInfo />}
            />
            <Route
              path="/vendor/manage/venuelist"
              element={<VenuManVenueList />}
            />
            <Route
              path="/vendor/manage/editvenue/:id"
              element={<VenManVendorInfo />}
            />
            <Route path="/vendor/manage/sports" element={<VenManSports />} />
            <Route
              path="/vendor/manage/addsport"
              element={<VenManAddSport />}
            />
            <Route
              path="/vendor/manage/editsport/:id"
              element={<VenManEditSport />}
            />
            <Route path="/vendor/manage/court" element={<VenManCourt />} />
            <Route
              path="/vendor/manage/addcourt"
              element={<VenManAddCourt />}
            />
            <Route path="/vendor/manage/images" element={<VenManImages />} />
            <Route
              path="/vendor/manage/addImages"
              element={<VenManAddImages />}
            />
            <Route
              path="/vendor/manage/slotpricing"
              element={<VenManSlots />}
            />
            <Route path="/vendor/manage/member" element={<VenManMember />} />
            <Route
              path="/vendor/manage/addmember"
              element={<VenManAddMember />}
            />
            <Route
              path="/vendor/manage/discount"
              element={<VenManDiscount />}
            />
            <Route
              path="/vendor/manage/adddiscount"
              element={<VenManAddDiscount />}
            />
            <Route
              path="/vendor/manage/editcoupon"
              element={<VenManEditDiscount />}
            />
            {/* DaySlots routes */}
            <Route path="/vendor/dayslots" element={<VenDaySlots />} />
            <Route
              path="/vendor/dayslots/booked-details/:id"
              element={<BookedDetails />}
            />
            <Route
              path="/vendor/dayslots/available-details/:id"
              element={<AvailableDetails />}
            />
            {/* Gym routes */}
            <Route path="/vendor/gym/list" element={<VenGymList />} />
            <Route path="/vendor/gym/add" element={<VenGymAdd />} />
            <Route path="/vendor/gym/edit/:id" element={<VenGymEdit />} />
            <Route path="/vendor/gym/member" element={<VenGymMember />} />
            <Route path="/vendor/gym/images" element={<VenGymImages />} />
            <Route path="/vendor/gym/discount" element={<VenGymDiscount />} />
            <Route
              path="/vendor/gym/adddiscount"
              element={<VenGymAddDiscount />}
            />
            <Route
              path="/vendor/gym/editdiscount/:id"
              element={<VenGymEditDiscount />}
            />
            <Route path="/vendor/gym/booking" element={<VenGymBooking />} />
            <Route path="/vendor/gym/coaches" element={<VenGymCoaches />} />
            <Route path="/vendor/gym/addcoach" element={<VenGymAddCoach />} />
            <Route
              path="/vendor/gym/editcoach/:id"
              element={<VenGymEditCoach />}
            />
            <Route path="/vendor/gym/timeslots" element={<VenGymTimeSlots />} />
            <Route
              path="/vendor/gym/addtimeslot"
              element={<VenGymAddTimeSlot />}
            />
            <Route
              path="/vendor/gym/edittimeslot/:id"
              element={<VenGymEditTimeSlot />}
            />
            {/* Revenue routes */}
            <Route
              path="/vendor/reports/booking"
              element={<VendorBookingPage />}
            />
            <Route path="/vendor/reports/revenue" element={<VenRepRevenue />} />
            <Route path="/vendor/reports/rating" element={<VenRepRating />} />
            <Route path="/vendor/reports/coupan" element={<VenRepCoupon />} />
            {/* Catch-all for vendor routes */}
            <Route path="*" element={<VendorNotFound />} />
          </Route>
        </Route>

        {/* Redirect to role dashboard */}
        {/* <Route path="/" element={<Navigate to={`/${role}`} />} /> */}
        {/* Redirect root based on auth state and role */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to={`/${role}`} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
