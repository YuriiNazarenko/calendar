import { createContext, useContext, useReducer, useEffect } from "react";
import { reducer } from "./reducer";
import { setInitialState } from "../utils/setInitialState";
import { saveEventsForMonth } from "../utils/localStorageUtils";

const CalendarEventsContext = createContext(null);

const CalendarDispatchContext = createContext(null);

export const CalendarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, undefined, setInitialState);
  const { calendarDays, activeMonth } = state;

  useEffect(() => {
    if (activeMonth && calendarDays.length) {
      saveEventsForMonth(activeMonth, calendarDays);
    }
  }, [calendarDays, activeMonth]);

  return (
    <CalendarEventsContext value={state}>
      <CalendarDispatchContext value={dispatch}>
        {children}
      </CalendarDispatchContext>
    </CalendarEventsContext>
  );
};

export const useCalendarEvents = () => useContext(CalendarEventsContext);

export const useCalendarDispatch = () => useContext(CalendarDispatchContext);
