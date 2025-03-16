import {
  FaHome,
  FaUsers,
  FaCog,
  FaEnvelope,
  FaMoneyCheck,
} from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";

const sponsorLinks = [
  {
    id: 1,
    name: "Dashboard",
    href: "/sponsor",
    icon: <FaHome />,
  },
  {
    id: 2,
    name: "Discover Talents",
    href: "/sponsor/discover",
    icon: <FaUsers />,
  },
  {
    id: 3,
    name: "Messages",
    href: "/sponsor/messages",
    icon: <FaEnvelope />,
  },
  {
    id: 4,
    name: "Sponsorships",
    href: "/sponsor/sponsorships",
    icon: <FaMoneyCheck />,
  },
  
  {
    id: 5,
    name: "Notifications",
    href: "/sponsor/notifications",
    icon: <IoNotifications />,
  },
  {
    id: 6,
    name: "Settings",
    href: "/sponsor/settings",
    icon: <FaCog />,
  },
];

export default sponsorLinks;
