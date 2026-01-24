import ApiService from './api.service.js';

class TimeSlotService {
  // Get all time slots
  async getAllTimeSlots(libraryId = null) {
    try {
      const endpoint = libraryId ? `/timeslots?libraryId=${libraryId}` : '/timeslots';
      const response = await ApiService.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching time slots:', error);
      throw error;
    }
  }

  // Create time slot
  async createTimeSlot(timeSlotData) {
    try {
      const response = await ApiService.post('/timeslots', timeSlotData, true);
      return response.data;
    } catch (error) {
      console.error('Error creating time slot:', error);
      throw error;
    }
  }

  // Update time slot
  async updateTimeSlot(id, timeSlotData) {
    try {
      const response = await ApiService.put(`/timeslots/${id}`, timeSlotData, true);
      return response.data;
    } catch (error) {
      console.error('Error updating time slot:', error);
      throw error;
    }
  }

  // Delete time slot
  async deleteTimeSlot(id) {
    try {
      const response = await ApiService.delete(`/timeslots/${id}`, true);
      return response;
    } catch (error) {
      console.error('Error deleting time slot:', error);
      throw error;
    }
  }
}

export default new TimeSlotService();