import ApiService from './api.service.js';

class SeatService {
  // Get all seats with optional filters
  async getAllSeats(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = queryParams ? `/seats?${queryParams}` : '/seats';
      const response = await ApiService.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching seats:', error);
      throw error;
    }
  }

  // Get available seats (AC / Non-AC with Time Slot)
  async getAvailableSeats(libraryId, facilityType, timeSlot) {
    try {
      const params = new URLSearchParams({
        libraryId,
        facilityType,
        available: true
      });

      // 👇 Only add timeSlot for Non-AC
      if (facilityType === 'Non-AC' && timeSlot) {
        params.append('timeSlot', timeSlot);
      }

      const response = await ApiService.get(`/seats?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching available seats:', error);
      throw error;
    }
  }

 
  async getSeatById(id) {
    try {
      const response = await ApiService.get(`/seats/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching seat:', error);
      throw error;
    }
  }

  
  async createSeat(seatData) {
    try {
      const response = await ApiService.post('/seats', seatData, true);
      return response.data;
    } catch (error) {
      console.error('Error creating seat:', error);
      throw error;
    }
  }

  // Bulk create seats
  async bulkCreateSeats(bulkData) {
    try {
      const response = await ApiService.post('/seats/bulk', bulkData, true);
      return response.data;
    } catch (error) {
      console.error('Error bulk creating seats:', error);
      throw error;
    }
  }

  // Update seat
  async updateSeat(id, seatData) {
    try {
      const response = await ApiService.put(`/seats/${id}`, seatData, true);
      return response.data;
    } catch (error) {
      console.error('Error updating seat:', error);
      throw error;
    }
  }

  // Delete seat
  async deleteSeat(id) {
    try {
      const response = await ApiService.delete(`/seats/${id}`, true);
      return response;
    } catch (error) {
      console.error('Error deleting seat:', error);
      throw error;
    }
  }
}

export default new SeatService();
