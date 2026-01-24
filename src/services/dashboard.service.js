import ApiService from './api.service';

class DashboardService {
  // Get dashboard statistics
  async getStats() {
    try {
      const response = await ApiService.get('/dashboard/stats', true);
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }

  // Get due payments
  async getDuePayments() {
    try {
      const response = await ApiService.get('/dashboard/due-payments', true);
      return response.data;
    } catch (error) {
      console.error('Error fetching due payments:', error);
      throw error;
    }
  }

  // Get recent activities
  async getRecentActivities() {
    try {
      const response = await ApiService.get('/dashboard/recent-activities', true);
      return response.data;
    } catch (error) {
      console.error('Error fetching recent activities:', error);
      throw error;
    }
  }
}

export default new DashboardService();