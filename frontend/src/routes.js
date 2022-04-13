import { Export } from "./features/export/Export";
import { Home } from "./features/home/Home";
import HomeIcon from "@material-ui/icons/Home";
import ImportExportIcon from "@material-ui/icons/ImportExport"
// import FlightIcon from "@material-ui/icons/Flight"

const routes = [
  { path: "/home", name: "Home", Component: Home, Icon: HomeIcon, externalUrl: false },
  { path: "/export", name: "Export", Component: Export, Icon: ImportExportIcon, externalUrl: false },
  // { path: "https://github.com/fa21-collaborative-drone-interactions/ScienceLabWebservice", name: "Mission Control", Component: Export, Icon: FlightIcon, externalUrl: true }
];

export default routes;