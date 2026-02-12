import StudentService from '../services/student.service';

export const checkAndResetMonthlyPayments = async (
  students,
  pricing,
  timeSlots,
  onRefresh
) => {
  const lastResetDate = localStorage.getItem('lastPaymentReset');
  const today = new Date();
  const currentMonth = `${today.getFullYear()}-${today.getMonth() + 1}`;

  if (lastResetDate !== currentMonth) {
    console.log('🔄 New month detected! Resetting payments with FULL monthly fee...');

    try {
      // Get only active students
      const activeStudents = students.filter(s => s.isActive);

      const updatePromises = activeStudents.map(async (student) => {
        let fullMonthlyFee = 0;

        // Get libraryId safely
        const libraryId = student.libraryId?._id || student.libraryId;

        // Base pricing
        if (pricing?.[libraryId]?.[student.facilityType]) {
          fullMonthlyFee = pricing[libraryId][student.facilityType];
        }

        // Override with time slot fee (Non-AC only)
        if (student.timeSlot && student.facilityType === 'Non-AC') {
          const slot = timeSlots.find(ts => ts.label === student.timeSlot);
          if (slot?.monthlyFee) {
            fullMonthlyFee = slot.monthlyFee;
          }
        }

        // Update student
        if (fullMonthlyFee > 0) {
          await StudentService.updateStudent(student._id, {
            monthlyFee: fullMonthlyFee,
            paymentStatus: 'DUE',
          });

          console.log(`✅ ${student.name}: Fee updated to ₹${fullMonthlyFee}`);
        } else {
          // Fallback: mark DUE only
          await StudentService.updatePaymentStatus(student._id, 'DUE');
          console.log(`⚠️ ${student.name}: Fee not found, marked as DUE`);
        }
      });

      await Promise.all(updatePromises);

      // Save reset month
      localStorage.setItem('lastPaymentReset', currentMonth);

      console.log(`✅ Reset completed for ${activeStudents.length} students`);

      if (onRefresh) onRefresh();
      return true;

    } catch (error) {
      console.error('❌ Error resetting monthly payments:', error);
      return false;
    }
  }

  return false;
};
