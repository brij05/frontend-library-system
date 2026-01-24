import ApiService from './api.service.js';

class AuthService {
  // Admin login
  async login(username, password) {
    try {
      const response = await ApiService.post('/auth/login', {
        username,
        password
      });
      
      if (response.success && response.token) {
        ApiService.setToken(response.token);
        return response.admin;
      }
      
      throw new Error('Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Logout
  logout() {
    ApiService.removeToken();
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!ApiService.getToken();
  }

  // Register admin (first time setup)
  async register(userData) {
    try {
      const response = await ApiService.post('/auth/register', userData);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
}

export default new AuthService();