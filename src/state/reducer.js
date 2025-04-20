import { createCalendarWithNotes } from "../utils/setInitialState";

export const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE": {
      const { note } = action;
      console.log("Reducer CREATE note: ", note);
      const updatedCalendarDays = state.calendarDays.map((item) => {
        if (item.iso === note.iso) {
          return {
            ...item,
            notes: [
              ...item.notes,
              {
                id: note.id,
                title: note.title,
                description: note.description,
                iso: note.iso,
              },
            ],
          };
        }
        return item;
      });

      return {
        ...state,
        calendarDays: updatedCalendarDays,
      };
    }

    case "UPDATE": {
      const { note } = action;
      const updatedCalendarDays = state.calendarDays.map((item) => {
        if (item.iso === note.iso) {
          const updatedNotes = item.notes.map((notesItem) => {
            if (notesItem.id === note.id) {
              return {
                ...notesItem,
                title: note.title,
                description: note.description,
              };
            }
            return notesItem;
          });

          return {
            ...item,
            notes: updatedNotes,
          };
        }
        return item;
      });

      return {
        ...state,
        calendarDays: updatedCalendarDays,
      };
    }

    case "DELETE": {
      const { iso, id } = action.payload;
      const updatedCalendarDays = state.calendarDays.map((item) => {
        if (item.iso === iso) {
          return {
            ...item,
            notes: item.notes.filter((notesItem) => notesItem.id !== id),
          };
        }
        return item;
      });

      return {
        ...state,
        calendarDays: updatedCalendarDays,
      };
    }

    case "LOAD": {
      const { activeMonth, notes } = action.payload;
      const calendarDays = createCalendarWithNotes(activeMonth, notes);
      return {
        activeMonth,
        calendarDays,
      };
    }

    default:
      return state;
  }
};
