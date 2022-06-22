import React from "react";
import Home from "./routes/Home";
import Layout from "./routes/Layout";
import TableView from "./routes/TableView";

interface SwitchPagesProps {
  url: string;
}

const SwitchPages: React.FC<SwitchPagesProps> = ({ url }) => {
  switch (url) {
    case "home":
      return <Home />;
    case "layout":
      return <Layout />;
    case "tableview":
      return <TableView />;
    default:
      return <Home />;
  }
};
export default SwitchPages;
