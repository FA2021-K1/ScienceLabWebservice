import { Export } from "./features/export/Export";
import { Home } from "./features/home/Home";
import HomeIcon from "@material-ui/icons/Home";
import ImportExportIcon from "@material-ui/icons/ImportExport"

const routes = [
  { path: "/home", name: "Home", Component: Home, Icon: HomeIcon },
  { path: "/export", name: "Export", Component: Export, Icon: ImportExportIcon }
];

export default routes;