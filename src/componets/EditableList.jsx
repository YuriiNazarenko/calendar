import { EditableListItem } from "./EditableListItem";

export const EditableList = ({ listItems, onEdit, onRemove }) => {
  const handleEdit = (item) => {
    onEdit(item);
  };

  const handleRemove = (noteID) => {
    onRemove(noteID);
  };

  return (
    <>
      <ul className="max-h-[200px] overflow-auto mt-[12px] custom-scroll">
        {listItems.map((item) => (
          <EditableListItem
            key={item.id}
            listItem={item}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        ))}
      </ul>
    </>
  );
};
