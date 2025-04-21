import { useCalendarEvents } from "../state/context";
import { CalendarCell } from "./CalendarCell";

export const CalendarGrid = ({}) => {
  const { calendarDays } = useCalendarEvents();

  return (
    <div className="flex-grow w-full overflow-scroll">
      <div className=" grid grid-cols-[repeat(7,minmax(200px,1fr))] lg:grid-cols-[repeat(7,1fr)] grid-rows-[repeat(5,1fr)] border-[0.5px] h-full w-full">
        {calendarDays.map((day) => (
          <CalendarCell day={day} key={day.iso} />
        ))}
      </div>
    </div>
  );
};
