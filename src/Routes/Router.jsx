import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import JoinAsManager from "../Pages/HR Manager/JoinAsManager";
import JoinAsEmployee from "../Pages/Employee/JoinAsEmployee";
import HrDashboardLayout from "../Layouts/HrDashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
            path: 'join_as_manager',
            Component: JoinAsManager
        },
        {
            path: 'join_as_employee',
            Component: JoinAsEmployee
        },
    ]
  },
  {
    path: "hr_dashboard",
    Component: HrDashboardLayout,
    children: [
      {
        
      }
    ]
  }
]);