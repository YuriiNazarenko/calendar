import "./App.css";
import { Calendar } from "./componets/Calendar";
import { CalendarProvider } from "./state/context";

function App() {
  return (
    <CalendarProvider>
      <Calendar />
    </CalendarProvider>
  );
}

export default App;
