import CreateEventModalButton from "../components/CreateEventModalButton";
import DaySchedule from "../components/DaySchedule";

const Events = () => {
  return (
    <div>
      <CreateEventModalButton />
      <h1>Se alle events her</h1>
      <DaySchedule day={1} />
      <DaySchedule day={2} />
      <DaySchedule day={3} />
      <DaySchedule day={4} />
      <DaySchedule day={5} />
    </div>
  );
};

export default Events;
