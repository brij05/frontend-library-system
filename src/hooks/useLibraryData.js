import { useState, useEffect } from 'react';
import LibraryService from '../services/library.service';
import SeatService from '../services/seat.service';
import StudentService from '../services/student.service';
import TimeSlotService from '../services/timeslot.service';
import PricingService from '../services/pricing.service';

export const useLibraryDataAPI = () => {
  const [libraries, setLibraries] = useState([]);
  const [seats, setSeats] = useState([]);
  const [students, setStudents] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [pricing, setPricing] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Fetch all data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔄 Fetching all data...');
      
      // Fetch libraries first
      const librariesData = await LibraryService.getAllLibraries();
      console.log('📚 Libraries fetched:', librariesData);
      setLibraries(librariesData || []);

      // Fetch other data in parallel
      const [seatsData, studentsData, timeSlotsData, pricingData] = await Promise.all([
        SeatService.getAllSeats().catch(err => {
          console.error('Seats fetch error:', err);
          return [];
        }),
        StudentService.getAllStudents({ active: true }).catch(err => {
          console.error('Students fetch error:', err);
          return [];
        }),
        TimeSlotService.getAllTimeSlots().catch(err => {
          console.error('TimeSlots fetch error:', err);
          return [];
        }),
        PricingService.getAllPricing().catch(err => {
          console.error('Pricing fetch error:', err);
          return [];
        })
      ]);

      console.log('💺 Seats fetched:', seatsData?.length || 0);
      console.log('👨‍🎓 Students fetched:', studentsData?.length || 0);
      console.log('⏰ TimeSlots fetched:', timeSlotsData?.length || 0);
      console.log('💰 Pricing fetched:', pricingData?.length || 0);

      setSeats(seatsData || []);
      setStudents(studentsData || []);
      setTimeSlots(timeSlotsData || []);

      // Convert pricing array to object format
      const pricingObj = {};
      if (Array.isArray(pricingData)) {
        pricingData.forEach(p => {
          const libId = p.libraryId?._id || p.libraryId;
          if (libId) {
            if (!pricingObj[libId]) {
              pricingObj[libId] = {};
            }
            pricingObj[libId][p.facilityType] = p.monthlyFee;
          }
        });
      }
      console.log('💰 Pricing object:', pricingObj);
      setPricing(pricingObj);

    } catch (err) {
      console.error('❌ Error fetching data:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Refresh specific data
  const refreshLibraries = async () => {
    try {
      const data = await LibraryService.getAllLibraries();
      console.log('🔄 Libraries refreshed:', data);
      setLibraries(data || []);
    } catch (err) {
      console.error('Error refreshing libraries:', err);
    }
  };

  const refreshSeats = async () => {
    try {
      const data = await SeatService.getAllSeats();
      console.log('🔄 Seats refreshed:', data?.length || 0);
      setSeats(data || []);
    } catch (err) {
      console.error('Error refreshing seats:', err);
    }
  };

  const refreshStudents = async () => {
    try {
      const data = await StudentService.getActiveStudents();
      console.log('🔄 Students refreshed:', data?.length || 0);
      setStudents(data || []);
    } catch (err) {
      console.error('Error refreshing students:', err);
    }
  };

  return {
    libraries,
    setLibraries,
    seats,
    setSeats,
    students,
    setStudents,
    timeSlots,
    setTimeSlots,
    pricing,
    setPricing,
    selectedLibrary,
    setSelectedLibrary,
    selectedFacility,
    setSelectedFacility,
    selectedTimeSlot,
    setSelectedTimeSlot,
    loading,
    error,
    refreshLibraries,
    refreshSeats,
    refreshStudents,
    refreshAll: fetchAllData
  };
};