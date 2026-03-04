import React, { useState } from 'react';
import { cases } from '../../data/mockData';
import SmartCaseManagement from '../../components/cases/SmartCaseManagement';

const CasesPage: React.FC = () => {
  return (
    <SmartCaseManagement cases={cases} />
  );
};

export default CasesPage;