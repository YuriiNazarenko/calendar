import { useState } from "react";
import { Modal } from "./Modal";

export const CalendarForm = ({ note, onClose, onSave }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [description, setDescription] = useState(note?.description || "");
  const [isoDate, setIsoDate] = useState(note.iso);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeDate = (e) => {
    setIsoDate(e.target.value);
  };

  const handleSave = () => {
    const formData = {
      title: title,
      description: description,
      iso: isoDate,
    };
    onSave(formData);
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={true}>
      <form
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-stretch gap-[24px] bg-gray-900 py-[24px] px-[20px] text-sky-50"
      >
        <label className="flex flex-col gap-[5px]">
          Title
          <input
            type="text"
            value={title}
            onChange={handleChangeTitle}
            className="border border-[var(--border-color)] h-[48px] p-[12px] rounded-[3px]"
          />
          {title.trim().length === 0 && (
            <p className="text-red-400">Please enter a title</p>
          )}
        </label>
        <label className="flex flex-col gap-[5px]">
          Description
          <textarea
            value={description}
            onChange={handleChangeDescription}
            className="border border-[var(--border-color)] h-[80px] p-[12px] resize-none rounded-[3px]"
          />
        </label>
        <label className="flex flex-col items-start gap-[8px]">
          Date
          <input
            type="date"
            value={isoDate}
            onChange={handleChangeDate}
            className=" border border-[var(--border-color)] py-[5px] px-[10px]"
          />
        </label>

        <button
          type="button"
          onClick={handleSave}
          disabled={title.trim().length === 0}
          className="bg-sky-50 text-[var(--c-dark-cyan)] py-[12px] px-[20px] cursor-pointer rounded-[3px]"
        >
          Save
        </button>
      </form>
    </Modal>
  );
};
