import React from 'react';
import { dashboardStats } from '../data/mockData';
import SmartDashboard from '../components/dashboard/SmartDashboard';

const Dashboard: React.FC = () => {
  return (
    <SmartDashboard stats={dashboardStats} />
  );
};

export default Dashboard;