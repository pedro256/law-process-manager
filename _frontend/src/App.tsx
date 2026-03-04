import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoadingScreen from './components/common/LoadingScreen';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';

// Lazy-loaded pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ClientsPage = lazy(() => import('./pages/clients/ClientsPage'));
const ClientDetailsPage = lazy(() => import('./pages/clients/ClientDetailsPage'));
const CasesPage = lazy(() => import('./pages/cases/CasesPage'));
const CaseDetailsPage = lazy(() => import('./pages/cases/CaseDetailsPage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const DocumentsPage = lazy(() => import('./pages/DocumentsPage'));
const FinancialPage = lazy(() => import('./pages/FinancialPage'));

const App: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    console.log("e")
    return <LoadingScreen />;
  }
 

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
      
      {isAuthenticated ? (
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Suspense fallback={<LoadingScreen />}>
              <Dashboard />
            </Suspense>
          } />
          
          <Route path="clients">
            <Route index element={
              <Suspense fallback={<LoadingScreen />}>
                <ClientsPage />
              </Suspense>
            } />
            <Route path=":id" element={
              <Suspense fallback={<LoadingScreen />}>
                <ClientDetailsPage />
              </Suspense>
            } />
          </Route>
          
          <Route path="cases">
            <Route index element={
              <Suspense fallback={<LoadingScreen />}>
                <CasesPage />
              </Suspense>
            } />
            <Route path=":id" element={
              <Suspense fallback={<LoadingScreen />}>
                <CaseDetailsPage />
              </Suspense>
            } />
          </Route>
          
          <Route path="calendar" element={
            <Suspense fallback={<LoadingScreen />}>
              <CalendarPage />
            </Suspense>
          } />
          
          <Route path="documents" element={
            <Suspense fallback={<LoadingScreen />}>
              <DocumentsPage />
            </Suspense>
          } />
          
          <Route path="financial" element={
            <Suspense fallback={<LoadingScreen />}>
              <FinancialPage />
            </Suspense>
          } />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default App;