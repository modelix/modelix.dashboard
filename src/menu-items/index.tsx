// project import
import dashboard from './dashboard.js';
import pages from './page';
import utilities from './utilities';
import support from './support';
import workspaces from "./workspaces.tsx";
import repositories from "./repositories.tsx";

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [workspaces, repositories, dashboard, pages, support]
};

export default menuItems;
