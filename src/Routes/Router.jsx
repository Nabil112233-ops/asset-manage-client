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
import HrProfile from "../Features/HR Dashboard/HrProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'join_as_manager',
        element: <JoinAsManager></JoinAsManager>
      },
      {
        path: 'join_as_employee',
        element: <JoinAsEmployee></JoinAsEmployee>
      }
    ]
  },
  {
    path: "/dashboard/hr",
    element: <ManagerRoute><HrDashboardLayout></HrDashboardLayout></ManagerRoute>,
    children: [
      {
        index: true,
        element: <AssetList></AssetList>
      },
      {
        path: 'add_asset',
        element: <AddAsset></AddAsset>
      },
      {
        path: 'request',
        element: <AllRequest></AllRequest>
      },
      {
        path: 'my_employee',
        element: <MyEmployee></MyEmployee>
      },
      {
        path: 'upgrade_package',
        element: <UpgradePackage></UpgradePackage>
      },
      {
        path: 'profile',
        element: <HrProfile></HrProfile>
      }
    ]
  },
  {
    path: '/dashboard/employee',
    element: <EmployeeRoute><EmployeeDashboardLayout></EmployeeDashboardLayout></EmployeeRoute>,
    children: [
      {
        index: true,
        element: <EmAsset></EmAsset>
      },
      {
        path: 'employee_request',
        element: <EmRequestAsset></EmRequestAsset>
      },
      {
        path: 'employee_team',
        element: <EmTeam></EmTeam>
      },
      {
        path: 'employee_profile',
        element: <EmProfile></EmProfile>
      }
    ]
  }
]);