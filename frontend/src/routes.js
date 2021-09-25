import { Export } from "./export";
import { Home } from "./home";
import HomeIcon from "@material-ui/icons/Home";
import ImportExportIcon from "@material-ui/icons/ImportExport"

const routes = [
  { path: "/home", name: "Home", Component: Home, Icon: HomeIcon },
  { path: "/export", name: "Export", Component: Export, Icon: ImportExportIcon }
];

export default routes;