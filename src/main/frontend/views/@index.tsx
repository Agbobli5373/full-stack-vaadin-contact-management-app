
import { useState } from "react";
import type { ViewConfig } from "@vaadin/hilla-file-router/types.js";

import PieChart from "Frontend/components/chart";
import Card from "Frontend/components/card";

export const config: ViewConfig = {
    menu: {
        title: "Main page"
    }
};

export default function MainView() {
  const [name, setName] = useState("");

  return (
    <>
     <div className="p-m">
         <h1>Dashboard</h1>
          <Card />
         <PieChart />

     </div>
    </>
  );
}
