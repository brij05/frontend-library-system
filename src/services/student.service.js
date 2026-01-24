import ApiService from './api.service.js';

class StudentService {
  // Get all students with optional filters
  async getAllStudents(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = queryParams ? `/students?${queryParams}` : '/students';
      const response = await ApiService.get(endpoint, true);
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  }

  // Get active students
  async getActiveStudents() {
    try {
      const response = await ApiService.get('/students?active=true', true);
      return response.data;
    } catch (error) {
      console.error('Error fetching active students:', error);
      throw error;
    }
  }

  // Get students with due payments
  async getDuePaymentStudents() {
    try {
      const response = await ApiService.get('/students?active=true&paymentStatus=DUE', true);
      return response.data;
    } catch (error) {
      console.error('Error fetching due payment students:', error);
      throw error;
    }
  }

  // Get student by ID
  async getStudentById(id) {
    try {
      const response = await ApiService.get(`/students/${id}`, true);
      return response.data;
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  }

  // Assign seat to student
  async assignSeat(studentData) {
    try {
      const response = await ApiService.post('/students', studentData, true);
      return response.data;
    } catch (error) {
      console.error('Error assigning seat:', error);
      throw error;
    }
  }

  // Update student
  async updateStudent(id, studentData) {
    try {
      const response = await ApiService.put(`/students/${id}`, studentData, true);
      return response.data;
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  }

  // Release seat
  async releaseSeat(id) {
    try {
      const response = await ApiService.post(`/students/${id}/release`, {}, true);
      return response;
    } catch (error) {
      console.error('Error releasing seat:', error);
      throw error;
    }
  }

  // Update payment status
  async updatePaymentStatus(id, paymentStatus) {
    try {
      const response = await ApiService.patch(`/students/${id}/payment`, {
        paymentStatus
      }, true);
      return response.data;
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  }
}

export default new StudentService();