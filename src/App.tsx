import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Auth from './pages/Auth';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="volunteer" element={
          <ProtectedRoute requiredRole="volunteer">
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Volunteer Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Welcome to your volunteer dashboard!</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="organizer" element={
          <ProtectedRoute requiredRole="organizer">
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Organizer Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Welcome to your organizer dashboard!</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="events" element={
          <ProtectedRoute>
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Event Discovery</h1>
              <p className="text-gray-600 dark:text-gray-400">Find and join cleanup events near you!</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="cleanup" element={
          <ProtectedRoute>
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Live Cleanup</h1>
              <p className="text-gray-600 dark:text-gray-400">Start your AI-powered cleanup session!</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="gamification" element={
          <ProtectedRoute requiredRole="volunteer">
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Gamification Hub</h1>
              <p className="text-gray-600 dark:text-gray-400">Track your achievements and compete with friends!</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="content" element={
          <ProtectedRoute requiredRole="organizer">
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Content Studio</h1>
              <p className="text-gray-600 dark:text-gray-400">Create compelling content for your events!</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="vendor" element={
          <ProtectedRoute>
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Vendor Portal</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage voucher redemptions and partnerships!</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="analytics" element={
          <ProtectedRoute>
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Impact Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400">Track your environmental impact!</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="assistant" element={
          <ProtectedRoute>
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">AI Assistant</h1>
              <p className="text-gray-600 dark:text-gray-400">Get help from your AI environmental assistant!</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="donations" element={
          <ProtectedRoute>
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Donation Hub</h1>
              <p className="text-gray-600 dark:text-gray-400">Support environmental causes!</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="gallery" element={
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Impact Gallery</h1>
            <p className="text-gray-600 dark:text-gray-400">Explore inspiring stories and transformations!</p>
          </div>
        } />
      </Route>
    </Routes>
  );
}

export default App;