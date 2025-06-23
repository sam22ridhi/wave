import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import VolunteerDashboard from './pages/VolunteerDashboard';
import EventDiscovery from './pages/EventDiscovery';
import LiveCleanup from './pages/LiveCleanup';
import OrganizerDashboard from './pages/OrganizerDashboard';
import ContentStudio from './pages/ContentStudio';
import GamificationHub from './pages/GamificationHub';
import VendorPortal from './pages/VendorPortal';
import ImpactAnalytics from './pages/ImpactAnalytics';
import AIAssistant from './pages/AIAssistant';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="volunteer" element={
          <ProtectedRoute requiredRole="volunteer">
            <VolunteerDashboard />
          </ProtectedRoute>
        } />
        <Route path="organizer" element={
          <ProtectedRoute requiredRole="organizer">
            <OrganizerDashboard />
          </ProtectedRoute>
        } />
        <Route path="events" element={
          <ProtectedRoute>
            <EventDiscovery />
          </ProtectedRoute>
        } />
        <Route path="cleanup" element={
          <ProtectedRoute>
            <LiveCleanup />
          </ProtectedRoute>
        } />
        <Route path="content" element={
          <ProtectedRoute requiredRole="organizer">
            <ContentStudio />
          </ProtectedRoute>
        } />
        <Route path="gamification" element={
          <ProtectedRoute requiredRole="volunteer">
            <GamificationHub />
          </ProtectedRoute>
        } />
        <Route path="vendor" element={
          <ProtectedRoute>
            <VendorPortal />
          </ProtectedRoute>
        } />
        <Route path="analytics" element={
          <ProtectedRoute>
            <ImpactAnalytics />
          </ProtectedRoute>
        } />
        <Route path="assistant" element={
          <ProtectedRoute>
            <AIAssistant />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;