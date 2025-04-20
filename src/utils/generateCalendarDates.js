export const generateCalendarDates = (isoDate) => {
  const year = parseInt(isoDate.slice(0, 4));
  const month = parseInt(isoDate.slice(5, 7)) - 1;

  const dates = [];
  const firstDayOfMonth = new Date(year, month, 1);

  const startDayIndex =
    firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCellsNeeded = startDayIndex + daysInMonth;
  const weeksCount = Math.ceil(totalCellsNeeded / 7);
  const totalCells = weeksCount * 7;

  const startDate = new Date(year, month, 1 - startDayIndex);

  for (let i = 0; i < totalCells; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const y = currentDate.getFullYear();
    const m = String(currentDate.getMonth() + 1).padStart(2, "0");
    const d = String(currentDate.getDate()).padStart(2, "0");

    const iso = `${y}-${m}-${d}`;

    dates.push({
      iso,
      notes: [],
      isCurrentMonth: currentDate.getMonth() === month,
    });
  }

  return dates;
};
