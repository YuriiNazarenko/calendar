import { useState } from "react";
import { Modal } from "./Modal";

export const EditableListItem = ({ listItem, onEdit, onRemove }) => {
  const [isOpenNote, setIsOpenNote] = useState(false);
  console.log("listItem: ", listItem);
  return (
    <>
      <li className="flex items-center justify-between gap-[12px] bg-[#0A2534] p-[5px_8px] mb-[1px]">
        <h3
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenNote(true);
          }}
          className="text-sm line-clamp-1 break-words max-w-[100px]"
        >
          {listItem?.title}
        </h3>

        <div className="flex items-center justify-between w-[50px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(listItem);
            }}
            className="text-blue-300 p-[2px] cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentcolor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M20.848 1.879a3 3 0 0 0-4.243 0L2.447 16.036a3 3 0 0 0-.82 1.533l-.587 2.936a2 2 0 0 0 2.353 2.353l2.936-.587a3 3 0 0 0 1.533-.82L22.019 7.293a3 3 0 0 0 0-4.243zm-2.829 1.414a1 1 0 0 1 1.415 0l1.171 1.171a1 1 0 0 1 0 1.415L17.933 8.55l-2.585-2.586zm-4.086 4.086L3.862 17.45a1 1 0 0 0-.274.51l-.587 2.936 2.935-.587a1 1 0 0 0 .511-.274L16.52 9.964 13.933 7.38Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(listItem.id);
            }}
            className="text-red-500 p-[2px] cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentcolor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 12v5m4-5v5M4 7h16M6 10v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-8M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9z"
              ></path>
            </svg>
          </button>
        </div>
      </li>
      <Modal isOpen={isOpenNote} onClose={() => setIsOpenNote(false)}>
        <div className="bg-gray-900 py-[24px] px-[20px] flex flex-col gap-[16px] text-sky-50">
          <h3>{listItem?.title}</h3>
          <p>{listItem?.description}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenNote(false);
            }}
            className="bg-sky-50 text-[var(--c-dark-cyan)] py-[12px] px-[20px] cursor-pointer rounded-[3px]"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};
