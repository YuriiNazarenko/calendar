import { useState } from "react";
import { CalendarForm } from "./CalendarForm";
import { EditableList } from "./EditableList";
import { useCalendarDispatch } from "../state/context";

export const CalendarCell = ({ day }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const dispatch = useCalendarDispatch();

  const date = new Date(day.iso);
  const cellDate = date.getDate();
  const cellWeekday = date.toLocaleDateString("uk-UA", { weekday: "short" });

  const formAction = (formData) => {
    if (currentNote?.id) {
      const updatedNote = {
        ...formData,
        id: currentNote.id,
      };

      dispatch({
        type: "UPDATE",
        note: updatedNote,
      });

      console.log("formAction -> onUpdate:", updatedNote);
    } else {
      const newNote = {
        ...formData,
        id: Date.now(),
      };

      dispatch({
        type: "CREATE",
        note: newNote,
      });
    }

    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentNote(null);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleEditNote = (noteToEdit) => {
    setCurrentNote(noteToEdit);
    handleOpen();
  };

  const handleRemoveNote = (noteIdToDelete) => {
    dispatch({
      type: "DELETE",
      payload: {
        id: noteIdToDelete,
        iso: day.iso,
      },
    });
  };

  const handleClickCell = (e) => {
    e.stopPropagation();
    setCurrentNote(null);
    handleOpen();
  };

  const noteForForm = currentNote || { iso: day.iso };
  const isCurrentDay = day.iso === new Date().toISOString().split("T")[0];

  return (
    <div
      onClick={handleClickCell}
      className={`bg-[var(--c-dark-cyan)] border-[0.5px] border-[var(--border-color)] p-[12px] h-full ${
        day.isCurrentMonth
          ? isCurrentDay
            ? "cursor-pointer bg-indigo-900"
            : "cursor-pointer bg-[var(--c-dark-cyan)]"
          : "pointer-events-none bg-gray-900 border-black"
      }`}
    >
      <div className="">
        <div className="flex justify-between text-[1rem] lg:text-[1.125rem] uppercase font-medium">
          <span>{cellDate}</span>
          <span>{cellWeekday}</span>
        </div>
      </div>

      {day.notes.length > 0 && (
        <EditableList
          listItems={day.notes}
          onEdit={handleEditNote}
          onRemove={handleRemoveNote}
        />
      )}

      <div>
        {isOpen && (
          <CalendarForm
            note={noteForForm}
            onClose={handleClose}
            onSave={formAction}
          />
        )}
      </div>
    </div>
  );
};
