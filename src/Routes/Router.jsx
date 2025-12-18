import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import JoinAsManager from "../Pages/HR Manager/JoinAsManager";
import JoinAsEmployee from "../Pages/Employee/JoinAsEmployee";
import HrDashboardLayout from "../Layouts/HR Layouts/HrDashboardLayout";
import AssetList from "../Features/HR Dashboard/Components/AssetList";
import AddAsset from "../Features/HR Dashboard/Components/AddAsset";
import AllRequest from "../Features/HR Dashboard/Components/AllRequest";
import MyEmployee from "../Features/HR Dashboard/Components/MyEmployee";
import UpgradePackage from "../Features/HR Dashboard/Components/UpgradePackage";
import EmployeeDashboardLayout from "../Layouts/Employee Layouts/EmployeeDashboardLayout";
import EmAsset from "../Features/Employee Dashboard/Components/EmAsset";
import EmRequestAsset from "../Features/Employee Dashboard/Components/EmRequestAsset";
import EmTeam from "../Features/Employee Dashboard/Components/EmTeam";
import EmProfile from "../Features/Employee Dashboard/Components/EmProfile";

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
    Component: EmployeeDashboardLayout,
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