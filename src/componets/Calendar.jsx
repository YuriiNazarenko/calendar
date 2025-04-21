import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";

export const Calendar = () => {
  return (
    <div className="min-h-[100vh] w-[100vw] bg-[var(--c-dark-cyan) text-sky-50">
      <div className="flex flex-col h-[100vh] items-stretch">
        <CalendarHeader />
        <CalendarGrid />
      </div>
    </div>
  );
};
