import dashboard from "./dashboard";
import pages from "./page";
import support from "./support";
import repositories from "./repositories";
import { NavGroupData } from "../layout/Dashboard/Drawer/DrawerContent/Navigation/NavGroup";
import workspaces from "./workspaces";
import {BranchesOutlined, CloudDownloadOutlined, CloudServerOutlined, HddOutlined} from "@ant-design/icons";
import GitIcon from "../components/icons/GitIcon.tsx";
import mpsIcon from "../assets/images/mps-logo.png";

const connectivity: NavGroupData = {
  id: 'group-connectivity',
  title: 'Connectivity',
  type: 'group',
  children: [
    {
      id: "maven",
      title: "Maven",
      type: "item",
      url: "/connectivity/maven",
      icon: CloudServerOutlined
    },
    {
      id: "git",
      title: "Git",
      type: "item",
      url: "/connectivity/git",
      icon: BranchesOutlined
    },
    {
      id: "uploads",
      title: "Uploads",
      type: "item",
      url: "/connectivity/uploads",
      icon: HddOutlined
    },
  ]
}


const menuItems: { items: NavGroupData[] } = {
  items: [
      connectivity,
      workspaces,
      repositories,
      support,
      pages
  ],
};

export default menuItems;
