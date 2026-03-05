
'use client'

import SmartDashboard from "./components/SmartDashboard";
import { dashboardStats } from "@/data/mockData";

export default function DashBoard() {

  return (

    <main>
      <SmartDashboard stats={dashboardStats}/>
    </main>
  );
}
