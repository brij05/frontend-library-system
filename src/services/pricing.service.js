import ApiService from './api.service.js';

class PricingService {
  // Get all pricing
  async getAllPricing(libraryId = null) {
    try {
      const endpoint = libraryId ? `/payments?libraryId=${libraryId}` : '/payments';
      const response = await ApiService.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching pricing:', error);
      throw error;
    }
  }

  // Create pricing
  async createPricing(pricingData) {
    try {
      const response = await ApiService.post('/payments', pricingData, true);
      return response.data;
    } catch (error) {
      console.error('Error creating pricing:', error);
      throw error;
    }
  }

  // Update pricing
  async updatePricing(id, pricingData) {
    try {
      const response = await ApiService.put(`/payments/${id}`, pricingData, true);
      return response.data;
    } catch (error) {
      console.error('Error updating pricing:', error);
      throw error;
    }
  }
}

export default new PricingService();
