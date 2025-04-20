import { generateCalendarDates } from "./generateCalendarDates";
import { getEventsForMonth } from "./localStorageUtils";

export const setInitialState = () => {
  const activeMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  const notes = getEventsForMonth(activeMonth);
  const calendarDays = createCalendarWithNotes(activeMonth, notes);

  return {
    activeMonth,
    calendarDays,
  };
};

/**
 *  activeMonth - "YYYY-MM"
 *  notes - { "2025-04-01": [...], "2025-04-15": [...] }
 */
export function createCalendarWithNotes(activeMonth, notes = {}) {
  const days = generateCalendarDates(activeMonth);

  return days.map((day) => {
    const notesForDay = notes[day.iso] || [];
    return {
      ...day,
      notes: [...notesForDay],
    };
  });
}
