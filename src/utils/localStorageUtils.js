export const getEventsForMonth = (activeMonth) => {
  try {
    const stored = localStorage.getItem(activeMonth);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Error reading events:", error);
    return {};
  }
};

export const saveEventsForMonth = (activeMonth, calendarDays) => {
  const notesByDate = {};

  calendarDays.forEach((day) => {
    if (day.notes?.length) {
      notesByDate[day.iso] = day.notes;
    }
  });

  localStorage.setItem(activeMonth, JSON.stringify(notesByDate));
};
