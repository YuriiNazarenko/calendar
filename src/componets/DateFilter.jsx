import React, { useState, useRef } from "react";
import { getEventsForMonth } from "../utils/localStorageUtils";
import { useCalendarDispatch, useCalendarEvents } from "../state/context";
import { formatDate } from "../utils/formatDate";

export const DateFilter = () => {
  const dispatch = useCalendarDispatch();
  const { activeMonth } = useCalendarEvents();
  const [value, setValue] = useState(`${activeMonth}-${new Date().getDate()}`);

  const inputDate = useRef(null);

  const handleClickDateIcon = () => {
    inputDate.current.showPicker();
  };

  const handleInputChange = (event) => {
    const newFullDate = event.target.value;

    setValue(newFullDate);

    const newMonthPart = newFullDate.slice(0, 7);

    const notes = getEventsForMonth(newMonthPart);

    dispatch({
      type: "LOAD",
      payload: {
        activeMonth: newMonthPart,
        notes,
      },
    });
  };

  const handleMonthShift = (monthsToAdd) => {
    let current = new Date(value);
    if (isNaN(current.getTime())) {
      current = new Date();
    }

    current.setMonth(current.getMonth() + monthsToAdd);

    const newFullDate = formatDate(current);

    setValue(newFullDate);

    const newMonthPart = newFullDate.slice(0, 7);

    const notes = getEventsForMonth(newMonthPart);

    dispatch({
      type: "LOAD",
      payload: {
        activeMonth: newMonthPart,
        notes,
      },
    });
  };

  return (
    <div className="flex items-center justify-between gap-[20px] p-[12px]">
      <button
        type="button"
        onClick={() => handleMonthShift(-1)}
        className="bg-[#061A25] text-sky-50 px-3 py-1 rounded cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentcolor"
          viewBox="0 0 32 32"
        >
          <path d="M23.505 0a1.073 1.073 0 0 1 .757 1.831L10.004 16.095l14.05 14.05c.417.417.417 1.098 0 1.515s-1.098.417-1.515 0L7.732 16.853a1.074 1.074 0 0 1 0-1.515L22.747.316c.208-.208.486-.316.757-.316z" />
        </svg>
      </button>
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleClickDateIcon();
        }}
        className="w-[12ch] px-[4px] overflow-hidden mx-20px"
      >
        <input
          ref={inputDate}
          type="date"
          value={value}
          onChange={handleInputChange}
          className="px-2 py-1 rounded text-sky-50 p-[5px_10px] outline-none cursor-pointer"
        />
      </div>
      <button
        type="button"
        onClick={() => handleMonthShift(1)}
        className="bg-[#061A25] text-sky-50 px-3 py-1 rounded cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          width="24"
          height="24"
          fill="currentcolor"
          viewBox="0 0 330 330"
        >
          <path d="m250.606 154.389-150-149.996c-5.857-5.858-15.355-5.858-21.213.001-5.857 5.858-5.857 15.355.001 21.213l139.393 139.39L79.393 304.394c-5.857 5.858-5.857 15.355.001 21.213C82.322 328.536 86.161 330 90 330s7.678-1.464 10.607-4.394l149.999-150.004a14.996 14.996 0 0 0 0-21.213"></path>
        </svg>
      </button>
    </div>
  );
};
