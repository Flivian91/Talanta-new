import { AiFillHome, AiOutlineCloudUpload, AiOutlineFire, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { MdExplore, MdNotifications, MdPlaylistAddCheck, MdSubscriptions } from "react-icons/md";

export const links = [
  { name: "Home", href: "/", icon: <AiFillHome size={24} /> },
  {
    name: "Trending",
    href: "/you/trending",
    icon: <AiOutlineFire size={24} />,
  },
  { name: "Discover", href: "/you/discover", icon: <MdExplore size={24} /> },
];

export const authnticatedLinks = [
  {
    name: "Subscriptions",
    href: "/you/subscriptions",
    icon: <MdSubscriptions size={24} />,
  },
  { name: "Me", href: "/you/profile", icon: <AiOutlineUser size={24} /> },
  {
    name: "Saved Videos",
    href: "/you/saved",
    icon: <MdPlaylistAddCheck size={24} />,
  },
  // {
  //   name: "Messages",
  //   href: "/you/messages",
  //   icon: <AiOutlineMessage size={24} />,
  // },
  {
    name: "Upload Talent",
    href: "/you/upload",
    icon: <AiOutlineCloudUpload size={24} />,
  },
  // {
  //   name: "Sponsorship Requests",
  //   href: "/you/sponsorships",
  //   icon: <MdAttachMoney size={24} />,
  // },
  {
    name: "Notifications",
    href: "/you/notifications",
    icon: <MdNotifications size={24} />,
  },
  {
    name: "Settings",
    href: "/you/settings",
    icon: <AiOutlineSetting size={24} />,
  },
];