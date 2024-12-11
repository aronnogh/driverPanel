import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import Login from "../components/Auth/Login";
import ChangePassword from "../components/Auth/ChangePassword";
import PastTrips from "../views/pastTrips/PastTrips";
import UpComingTrips from "../views/upComingTrips/UpComingTrips";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout"));
/****End Layouts*****/

/*****Pages******/
// const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1"));


/*****Routes******/
const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/upcoming-trips" replace /> },
      
      { path: "/login", element: <Login /> },

      // past trips:
      {
        path: "/past-trips",
        element: (
          <ProtectedRoute>
            <PastTrips />
          </ProtectedRoute>
        ),
      },
// upcoming trips
      {
        path: "/upcoming-trips",
        element: (
          <ProtectedRoute>
            <UpComingTrips />
          </ProtectedRoute>
        ),
      },
// change password
      {
        path: "/change-password",
        element: (
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default ThemeRoutes;
