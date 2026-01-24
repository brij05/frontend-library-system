import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import StudentFlow from './components/StudentFlow';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Loading from './components/common/Loading';
import ErrorMessage from './components/common/ErrorMessage';
import { useLibraryDataAPI } from './hooks/useLibraryData';
import AuthService from './services/auth.service';
import Footer from './components/Footer';

const App = () => {
  const [view, setView] = useState('landing');
  const [isAdmin, setIsAdmin] = useState(AuthService.isAuthenticated());
  
  const {
    libraries,
    seats,
    setSeats,
    timeSlots,
    students,
    setStudents,
    pricing,
    selectedLibrary,
    setSelectedLibrary,
    selectedFacility,
    setSelectedFacility,
    selectedTimeSlot,
    setSelectedTimeSlot,
    loading,
    error,
    refreshSeats,
    refreshStudents,
    refreshAll
  } = useLibraryDataAPI();

  useEffect(() => {
    console.log('🎯 App State:', {
      view,
      isAdmin,
      librariesCount: libraries?.length || 0,
      seatsCount: seats?.length || 0,
      studentsCount: students?.length || 0,
      loading,
      error
    });
  }, [view, isAdmin, libraries, seats, students, loading, error]);

  if (loading && view !== 'landing' && view !== 'admin') {
    return <Loading message="Loading library data..." />;
  }

  if (error && view !== 'landing' && view !== 'admin') {
    return <ErrorMessage message={error} onRetry={refreshAll} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {view === 'landing' && <LandingPage setView={setView} />}
        
        {view === 'student' && (
          <StudentFlow
            libraries={libraries}
            seats={seats}
            timeSlots={timeSlots}
            pricing={pricing}
            selectedLibrary={selectedLibrary}
            setSelectedLibrary={setSelectedLibrary}
            selectedFacility={selectedFacility}
            setSelectedFacility={setSelectedFacility}
            selectedTimeSlot={selectedTimeSlot}
            setSelectedTimeSlot={setSelectedTimeSlot}
            setView={setView}
          />
        )}
        
        {view === 'admin' && (
          <AdminLogin
            setView={setView}
            setIsAdmin={setIsAdmin}
          />
        )}
        
        {view === 'admin-dashboard' && isAdmin && (
          <AdminDashboard
            libraries={libraries}
            seats={seats}
            setSeats={setSeats}
            timeSlots={timeSlots}
            students={students}
            setStudents={setStudents}
            pricing={pricing}
            setView={setView}
            setIsAdmin={setIsAdmin}
            onRefreshSeats={refreshSeats}
            onRefreshStudents={refreshStudents}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;