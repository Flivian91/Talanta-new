import {
  FaHome,
  FaUsers,
  FaCog,
  FaChartBar,
  FaVideo,
  FaBell,
  FaLayerGroup,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

const adminLinks = [
  {
    id: 1,
    name: "Dashboard",
    href: "/admin",
    icon: <FaHome />,
  },
  {
    id: 2,
    name: "Users",
    href: "/admin/users",
    icon: <FaUsers />,
  },
  {
    id: 3,
    name: "Talents",
    href: "/admin/talents",
    icon: <FaVideo />,
  },
  {
    id: 4,
    name: "Categories",
    href: "/admin/categories",
    icon: <FaLayerGroup />,
  },
  {
    id: 5,
    name: "Pending Approvals",
    href: "/admin/pending",
    icon: <MdPendingActions />,
  },
  {
    id: 6,
    name: "Reports & Analytics",
    href: "/admin/reports",
    icon: <FaChartBar />,
  },
  {
    id: 7,
    name: "Notifications",
    href: "/admin/notifications",
    icon: <FaBell />,
  },
  {
    id: 8,
    name: "Settings",
    href: "/admin/settings",
    icon: <FaCog />,
  },
];

export default adminLinks;
