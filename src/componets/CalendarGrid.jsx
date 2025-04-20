import { CalendarCell } from "./CalendarCell";

export const CalendarGrid = ({
  calendarDays,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="flex-grow w-full overflow-scroll">
      <div className=" grid grid-cols-[repeat(7,minmax(200px,1fr))] lg:grid-cols-[repeat(7,1fr)] grid-rows-[repeat(5,1fr)] border-[0.5px] h-full w-full">
        {calendarDays?.map((day) => (
          <CalendarCell
            day={day}
            onCreate={onCreate}
            onUpdate={onUpdate}
            onDelete={onDelete}
            key={day.iso}
          />
        ))}
      </div>
    </div>
  );
};
