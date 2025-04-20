import { useReducer, useEffect } from "react";
import { reducer } from "../state/reducer";
import { setInitialState } from "../utils/setInitialState";
import {
  saveEventsForMonth,
  getEventsForMonth,
} from "../utils/localStorageUtils";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";

export const Calendar = () => {
  const [state, dispatch] = useReducer(reducer, undefined, setInitialState);
  const { calendarDays, activeMonth } = state;

  useEffect(() => {
    if (activeMonth && calendarDays.length) {
      saveEventsForMonth(activeMonth, calendarDays);
    }
  }, [calendarDays, activeMonth]);

  const handleMonthChange = (newMonth) => {
    const notes = getEventsForMonth(newMonth);
    dispatch({
      type: "LOAD",
      payload: {
        activeMonth: newMonth,
        notes,
      },
    });
  };

  const handleCreate = (note) => {
    dispatch({
      type: "CREATE",
      note,
    });
  };

  const handleUpdate = (note) => {
    console.log("handleUpdate note: ", note);
    dispatch({
      type: "UPDATE",
      note,
    });
  };

  const handleDelete = (note) => {
    dispatch({
      type: "DELETE",
      payload: {
        iso: note.iso,
        id: note.id,
      },
    });
  };

  return (
    <div className="min-h-[100vh] w-[100vw] bg-[var(--c-dark-cyan) text-sky-50">
      <div className="flex flex-col h-[100vh] items-stretch">
        <CalendarHeader
          valueDate={`${activeMonth}-${new Date().getDate()}`}
          onChange={handleMonthChange}
          onCreate={handleCreate}
        />
        <CalendarGrid
          calendarDays={calendarDays}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
