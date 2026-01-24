import ApiService from './api.service.js';

class LibraryService {
  // Get all libraries
  async getAllLibraries() {
    try {
      const response = await ApiService.get('/libraries');
      return response.data;
    } catch (error) {
      console.error('Error fetching libraries:', error);
      throw error;
    }
  }

  // Get library by ID
  async getLibraryById(id) {
    try {
      const response = await ApiService.get(`/libraries/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching library:', error);
      throw error;
    }
  }

  // Create library
  async createLibrary(libraryData) {
    try {
      const response = await ApiService.post('/libraries', libraryData, true);
      return response.data;
    } catch (error) {
      console.error('Error creating library:', error);
      throw error;
    }
  }

  // Update library
  async updateLibrary(id, libraryData) {
    try {
      const response = await ApiService.put(`/libraries/${id}`, libraryData, true);
      return response.data;
    } catch (error) {
      console.error('Error updating library:', error);
      throw error;
    }
  }

  // Delete library
  async deleteLibrary(id) {
    try {
      const response = await ApiService.delete(`/libraries/${id}`, true);
      return response;
    } catch (error) {
      console.error('Error deleting library:', error);
      throw error;
    }
  }
}

export default new LibraryService();