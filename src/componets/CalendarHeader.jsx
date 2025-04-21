import { useState } from "react";
import { DateFilter } from "./DateFilter";
import { CalendarForm } from "./CalendarForm";
import { useCalendarDispatch, useCalendarEvents } from "../state/context";

export const CalendarHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { activeMonth } = useCalendarEvents();
  const dispatch = useCalendarDispatch();

  const handleCreate = (formData) => {
    const newNote = {
      ...formData,
      id: Date.now(),
    };

    dispatch({
      type: "CREATE",
      note: newNote,
    });
  };

  const valueDate = `${activeMonth}-${new Date().getDate()}`;

  return (
    <div className="flex flex-col gap-8 items-center justify-between lg:flex-row bg-[var(--c-dark-cyan)] p-[20px]">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-900 text-sky-50 rounded-full cursor-pointer flex items-center justify-center w-[50px] h-[50px]"
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="w-6 h-6"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
      </button>
      <h2 className="uppercase text-3xl lg:text-5xl relative lg:translate-x-[50%]">
        {new Date(valueDate).toLocaleString("uk-UA", { month: "long" })}
      </h2>
      <DateFilter />
      {isOpen && (
        <CalendarForm
          note={{ iso: valueDate }}
          onClose={() => setIsOpen(false)}
          onSave={handleCreate}
        />
      )}
    </div>
  );
};
