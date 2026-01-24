export const getAvailableSeats = (seats, libraryId, facilityType) => {
  return seats.filter(s => 
    s.libraryId === libraryId && 
    s.facilityType === facilityType && 
    !s.isBooked
  );
};

export const calculateProratedFee = (baseAmount, joinDate) => {
  const join = new Date(joinDate);
  const daysInMonth = new Date(join.getFullYear(), join.getMonth() + 1, 0).getDate();
  const daysRemaining = daysInMonth - join.getDate() + 1;
  return Math.round((baseAmount / daysInMonth) * daysRemaining);
};