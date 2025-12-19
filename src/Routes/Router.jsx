import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import JoinAsManager from "../Pages/HR Manager/JoinAsManager";
import JoinAsEmployee from "../Pages/Employee/JoinAsEmployee";
import HrDashboardLayout from "../Layouts/HR Layouts/HrDashboardLayout";
import AssetList from "../Features/HR Dashboard/AssetList";
import AddAsset from "../Features/HR Dashboard/AddAsset";
import AllRequest from "../Features/HR Dashboard/AllRequest";
import MyEmployee from "../Features/HR Dashboard/MyEmployee";
import UpgradePackage from "../Features/HR Dashboard/UpgradePackage";
import EmployeeDashboardLayout from "../Layouts/Employee Layouts/EmployeeDashboardLayout";
import EmAsset from "../Features/Employee Dashboard/EmAsset";
import EmRequestAsset from "../Features/Employee Dashboard/EmRequestAsset";
import EmTeam from "../Features/Employee Dashboard/EmTeam";
import EmProfile from "../Features/Employee Dashboard/EmProfile";
import Login from "../Pages/Login/Login";
import ManagerRoute from "./Private Route/ManagerRoute";
import EmployeeRoute from "./Private Route/EmployeeRoute";

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
        path: 'login',
        Component: Login
      },
      {
        path: 'join_as_manager',
        Component: JoinAsManager
      },
      {
        path: 'join_as_employee',
        Component: JoinAsEmployee
      }
    ]
  },
  {
    path: "hr_dashboard",
    element: <ManagerRoute><HrDashboardLayout></HrDashboardLayout></ManagerRoute>,
    children: [
      {
        index: true,
        Component: AssetList
      },
      {
        path: 'add_asset',
        Component: AddAsset
      },
      {
        path: 'request',
        Component: AllRequest
      },
      {
        path: 'my_employee',
        Component: MyEmployee
      },
      {
        path: 'upgrade_package',
        Component: UpgradePackage
      }
    ]
  },
  {
    path: 'employee_dashboard',
    element: <EmployeeRoute><EmployeeDashboardLayout></EmployeeDashboardLayout></EmployeeRoute>,
    children: [
      {
        index: true,
        Component: EmAsset
      },
      {
        path: 'employee_request',
        Component: EmRequestAsset
      },
      {
        path: 'employee_team',
        Component: EmTeam
      },
      {
        path: 'employee_profile',
        Component: EmProfile
      }
    ]
  }
]);